const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

const GetServiceRequests = async (req, res) => {
  const { providerId } = req.body;
  console.log("providerID:", { providerId });
  const sql = `
      SELECT sr.id, sr.details, sr.cityId, sr.createdAt, sr.title,status
      FROM service_web.service_requests sr
      JOIN service_web.service_request_providers srp ON sr.id = srp.serviceRequestId
      WHERE srp.serviceProviderId = ?
      ORDER BY sr.createdAt DESC
    `;

  db.query(sql, [providerId], (err, results) => {
    if (err) {
      console.error("Error fetching requests:", err);
      res.status(500).json({ error: "Failed to fetch requests" });
    } else {
      console.log("Fetched requests:", results);
      res.json(results);
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
