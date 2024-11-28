const db = require("../models/db");

// Get Requests History
const getRequestsHistory = (req, res) => {
  const { clientId } = req.body;
  console.log("clientId:+", clientId);

  if (!clientId) {
    return res.status(400).json({ message: "Client ID is required" });
  }

  const query = `
 SELECT 
    sr.id AS request_id,
    sr.title AS request_title,
    sr.details AS request_details,
    sr.cityId AS city_id,
    sr.createdAt AS request_created_at,
    sr.userId AS user_id,
    srp.price AS provider_price,
    srp.status AS provider_status,
    srp.serviceProviderId AS provider_id,
    sp.name AS provider_name,
    sp.phone AS provider_phone,
    sp.title AS provider_title,
    sp.service_description AS provider_description,
    sc.name AS category_name,
    sc.icon AS category_icon
FROM 
    service_requests sr
JOIN 
    service_request_providers srp ON sr.id = srp.serviceRequestId
JOIN 
    service_providers sp ON srp.serviceProviderId = sp.id
JOIN 
    service_categories sc ON sp.category_id = sc.id
WHERE 
    sr.userId = ?
ORDER BY 
    sr.createdAt DESC;

`;
  db.query(query, [clientId], (err, results) => {
    if (err) {
      console.error("Error fetching requests:", err);
      res.status(500).json({ message: "Error fetching requests" });
    } else {
      res.json(results);
      
    }
  });
};

// Delete a Request
// const deleteRequest = (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ message: "Request ID is required" });
//   }

//   const query = "DELETE console.log(results);FROM requests WHERE id = ?";
//   db.query(query, [id], (err) => {
//     if (err) {
//       console.error("Error deleting request:", err);
//       res.status(500).json({ message: "Error deleting request" });
//     } else {
//       res.json({ message: "Request deleted successfully" });
//     }
//   });
// };

module.exports = {
  getRequestsHistory,
  //   deleteRequest,
};
