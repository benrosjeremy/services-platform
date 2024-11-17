const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

const createServiceRequest = async (req, res) => {
  const { title, details, cityId, serviceCategoryId, providers, userId } =
    req.body;
  console.log("Service request data:", req.body);

  // בדיקת קלט
  if (
    !title ||
    !details ||
    !cityId ||
    !serviceCategoryId ||
    !Array.isArray(providers)
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  // התחלת טרנזקציה
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ message: "Error starting transaction" });
    }

    // Insert into service_requests
    db.execute(
      `INSERT INTO service_requests (title, details, cityId, serviceCategoryId, createdAt, userId)
       VALUES (?, ?, ?, ?, NOW(),?)`,
      [title, details, cityId, serviceCategoryId, userId],
      (err, result) => {
        if (err) {
          console.error("Error inserting into service_requests:", err);
          return db.rollback(() => {
            res
              .status(500)
              .json({ message: "Error inserting service request" });
          });
        }

        const serviceRequestId = result.insertId;
        console.log("Service request inserted:", result);

        // Insert into service_request_providers
        const providerValues = providers.map((providerId) => [
          serviceRequestId,
          providerId,
          null, // price placeholder (will be updated later)
        ]);

        db.query(
          `INSERT INTO service_request_providers (serviceRequestId, serviceProviderId, price)
           VALUES ?`,
          [providerValues],
          (err) => {
            if (err) {
              console.error(
                "Error inserting into service_request_providers:",
                err
              );
              return db.rollback(() => {
                res
                  .status(500)
                  .json({ message: "Error inserting service providers" });
              });
            }

            // Commit the transaction
            db.commit((err) => {
              if (err) {
                console.error("Error committing transaction:", err);
                return db.rollback(() => {
                  res
                    .status(500)
                    .json({ message: "Error committing transaction" });
                });
              }

              console.log("Transaction committed successfully");
              res
                .status(201)
                .json({ message: "Service request added successfully" });
            });
          }
        );
      }
    );
  });
};

const GetCategories = async (req, res) => {
  const query = "SELECT * FROM service_web.service_categories"; // כאן תשים את שם הטבלה שלך
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "אירעה שגיאה בשרת" });
    } else {
      res.json(results); // שולחים את התוצאות כ-JSON
    }
  });
};

const GetCities = async (req, res) => {
  const query = "SELECT * FROM service_web.cities"; // כאן תשים את שם הטבלה שלך
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "אירעה שגיאה בשרת" });
    } else {
      res.json(results); // שולחים את התוצאות כ-JSON
    }
  });
};

const GetProviders = async (req, res) => {
  const query = "SELECT * FROM service_web.service_providers"; // כאן תשים את שם הטבלה שלך
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "אירעה שגיאה בשרת" });
    } else {
      res.json(results); // שולחים את התוצאות כ-JSON
    }
  });
};

module.exports = {
  createServiceRequest,
  GetCategories,
  GetCities,
  GetProviders,
};
