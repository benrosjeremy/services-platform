const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

const GetServiceRequests = async (req, res) => {
    const { providerId } = req.body;
    console.log("providerID:", { providerId });
    const sql = `
      SELECT sr.id, sr.details, sr.cityId, sr.createdAt, sr.title
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



  module.exports = {
    GetServiceRequests,
  };