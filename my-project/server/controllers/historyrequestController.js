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
    sr.id AS serviceRequestId,
    sr.title,
    sr.details,
    sr.createdAt ,
    c.city_name AS cityName,
    sc.name AS categoryName,
    sc.icon AS categoryIcon,
    
    -- Subquery for providers with additional details
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'serviceProviderId', srp.serviceProviderId,
                'price', srp.price,
                'status', srp.status,
                'id', p.id,
                'name', p.name,
                'phone', p.phone,
                'city', c.city_name,
                'email', p.email,
                'logo', p.logo,
                'title', p.title,
                'service_description', p.service_description,
                'category_id', p.category_id
            )
        )
        FROM service_request_providers srp
        JOIN service_providers p ON srp.serviceProviderId = p.id
        LEFT JOIN cities c ON p.city_id = c.id
        WHERE srp.serviceRequestId = sr.id
    ) AS serviceProviders,
    
    -- Subquery for images
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'imageId', si.id,
                'path', si.path,
                'createdAt', si.createdAt
            )
        )
        FROM service_images si
        WHERE si.serviceRequestId = sr.id
    ) AS serviceImages

FROM service_requests sr

-- Joining additional tables
LEFT JOIN cities c ON sr.cityId = c.id
LEFT JOIN service_categories sc ON sr.serviceCategoryId = sc.id

WHERE sr.userId = ?

GROUP BY sr.id, sr.title, sr.details, sr.createdAt, c.city_name, sc.name, sc.icon
ORDER BY sr.createdAt DESC;

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
