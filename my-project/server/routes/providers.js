const express = require("express");
const router = express.Router();

// דוגמה לנתיב לקבלת ספקים
router.get("/", (req, res) => {
  // כאן תוכל להחזיר רשימת ספקים מהבסיס נתונים
  res.send("List of providers");
});

// דוגמה לנתיב להוספת ספק
router.post("/", (req, res) => {
  // כאן תוכל להוסיף ספק חדש לבסיס נתונים
  res.send("Provider added");
});

module.exports = (db) => {
  return router;
};
