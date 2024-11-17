const express = require("express");
const router = express.Router();

const providerController = require("../controllers/providerController.js");

router.post("/get-service-requests", providerController.GetServiceRequests);

module.exports = router;
// const express = require("express");
// const router = express.Router();

// module.exports = (db) => {
//   // בקשה לקבלת כל הבקשות עבור ספק שירות
//   router.get("/api/requests/:providerId", async (req, res) => {
//     const providerId = req.params.providerId;
//     console.log("providerID:", { providerId });
//     const sql = `
//       SELECT sr.id, sr.details, sr.cityId, sr.createdAt, sr.title
//       FROM service_web.service_requests sr
//       JOIN service_web.service_request_providers srp ON sr.id = srp.serviceRequestId
//       WHERE srp.serviceProviderId = ?
//       ORDER BY sr.createdAt DESC
//     `;

//     db.query(sql, [providerId], (err, results) => {
//       if (err) {
//         console.error("Error fetching requests:", err);
//         res.status(500).json({ error: "Failed to fetch requests" });
//       } else {
//         console.log("Fetched requests:", results);
//         res.json(results);
//       }
//     });
//   });

//   // עדכון בקשה לאישור או דחייה
//   router.put("/api/requests/:requestId", (req, res) => {
//     const requestId = req.params.requestId;
//     const { status, price } = req.body;
//     const sql = `
//       UPDATE service_web.service_requests
//       SET status = ?, price = ?
//       WHERE id = ?
//     `;

//     db.query(sql, [status, price, requestId], (err, result) => {
//       if (err) {
//         console.error("Error updating request:", err);
//         res.status(500).json({ error: "Failed to update request" });
//       } else {
//         res.json({ message: "Request updated successfully" });
//       }
//     });
//   });

//   return router;
// };
