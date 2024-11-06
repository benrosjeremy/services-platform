const express = require("express");
const router = express.Router();

// דוגמה לנתיב רישום
router.post("/register", (req, res) => {
  // כאן אתה יכול לטפל בלוגיקת הרישום
  res.send("User registered");
});

// דוגמה לנתיב התחברות
router.post("/login", (req, res) => {
  // כאן אתה יכול לטפל בלוגיקת ההתחברות
  res.send("User logged in");
});

module.exports = (db) => {
  // החזר את הנתיבים עם הבסיס נתונים
  return router;
};
