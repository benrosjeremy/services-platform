// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../server");

// פונקציית רישום
exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;

  // בדיקה אם המשתמש קיים
  db.query(
    "SELECT * FROM service_web.users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length > 0) {
        return res.status(409).send("User already exists");
      }

      // הוספת משתמש לטבלה ללא הצפנת הסיסמה
      db.query(
        "INSERT INTO service_web.users SET ?",
        { first_name, last_name, email, phone, password }, // שמירת הסיסמה ישירות
        (error) => {
          if (error) {
            return res.status(500).json({ error: "Database insert error" });
          }
          res.send("User registered successfully");
        }
      );
    }
  );
};

// פונקציית כניסה
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];
    // בדיקת סיסמה ללא Hashing
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // מחזיר את כל אובייקט המשתמש
    res.status(200).json(user);
  });
};

exports.registerProvider = async (req, res) => {
  const {
    name,
    phone,
    city,
    email,
    password,
    title,
    service_description,
    category_id,
    city_id,
  } = req.body;

  // בדיקה אם המייל כבר קיים במערכת
  const query = "SELECT * FROM service_web.service_providers WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // הוספת בעל המקצוע לטבלה ללא הצפנת הסיסמה
    const insertQuery = `INSERT INTO service_web.service_providers (name, phone, city, email, password, title, service_description, category_id, city_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      name,
      phone,
      city,
      email,
      password, // שמירת הסיסמה כפי שהתקבלה, ללא הצפנה
      title,
      service_description,
      category_id,
      city_id,
    ];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database insert error" });
      }
      res.status(201).json({ message: "Provider registered successfully" });
    });
  });
};

// פונקציית כניסה
exports.loginProvider = async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM service_providers WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Provider not found" });
    }

    const provider = results[0];

    // השוואה פשוטה של הסיסמה ללא הצפנה
    if (password !== provider.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json(provider);
  });
};

// כניסה ורישום לבעלי מקצוע ייעשה בדרך דומה
