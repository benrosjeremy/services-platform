const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

// const GetServiceRequests = async (req, res) => {
//   const { providerId } = req.body;
//   console.log("providerID:", { providerId });
//   const sql = `
//       SELECT sr.id, sr.details, sr.cityId, sr.createdAt, sr.title,status
//       FROM service_web.service_requests sr
//       JOIN service_web.service_request_providers srp ON sr.id = srp.serviceRequestId
//       WHERE srp.serviceProviderId = ?
//       ORDER BY sr.createdAt DESC
//     `;

//   db.query(sql, [providerId], (err, results) => {
//     if (err) {
//       console.error("Error fetching requests:", err);
//       res.status(500).json({ error: "Failed to fetch requests" });
//     } else {
//       console.log("Fetched requests:", results);
//       res.json(results);
//     }
//   });
// };
const GetServiceRequests = async (req, res) => {
  const { providerId } = req.body;
  console.log("providerID:", { providerId });

  const sql = `
    SELECT 
      sr.id AS serviceRequestId, 
      sr.details, 
      sr.cityId, 
      sr.createdAt, 
      sr.title, 
      status, 
      si.path AS imagePath
    FROM 
      service_web.service_requests sr
    JOIN 
      service_web.service_request_providers srp ON sr.id = srp.serviceRequestId
    LEFT JOIN 
      service_web.service_images si ON sr.id = si.serviceRequestId
    WHERE 
      srp.serviceProviderId = ?
    ORDER BY 
      sr.createdAt DESC
  `;

  db.query(sql, [providerId], (err, results) => {
    if (err) {
      console.error("Error fetching requests:", err);
      res.status(500).json({ error: "Failed to fetch requests" });
    } else {
      // יצירת מבנה מתאים עם תמונות במערך
      const serviceRequests = results.reduce((acc, row) => {
        const {
          serviceRequestId,
          details,
          cityId,
          createdAt,
          title,
          status,
          imagePath,
        } = row;

        // בדוק אם ה-service כבר נמצא ברשימה
        let service = acc.find((s) => s.id === serviceRequestId);
        if (!service) {
          // צור אובייקט חדש אם לא נמצא
          service = {
            id: serviceRequestId,
            details,
            cityId,
            createdAt,
            title,
            status,
            images: [],
          };
          acc.push(service);
        }

        // הוסף את ה-imagePath למערך התמונות אם קיים
        if (imagePath) {
          service.images.push(imagePath);
        }

        return acc;
      }, []);

      console.log("Fetched requests:", serviceRequests);
      res.json(serviceRequests);
    }
  });
};

const SetPrice = async (req, res) => {
  const { status, price, providerId, requestId } = req.body;
  console.log(status + " " + price + " " + providerId + " " + requestId);

  if (!["אושר", "נדחה"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const sql = `
    UPDATE service_web.service_request_providers
    SET status = ?, price = ?
    WHERE serviceRequestId = ? and serviceProviderId = ?
  `;

  db.query(sql, [status, price, requestId, providerId], (err, results) => {
    if (err) {
      console.error("Error updating request status:", err);
      return res.status(500).json({ error: "Failed to update request status" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Request not found" });
    }

    console.log("Updated request:", { requestId, status, price });
    res.json({ success: true, message: "Request status updated" });
  });
};

module.exports = {
  GetServiceRequests,
  SetPrice,
};
