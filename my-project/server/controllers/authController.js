const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fs = require("fs");

const multer = require("multer");
const path = require("path");
const db = require("../models/db");

// פונקציית רישום
const registerUser = async (req, res) => {
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
const loginUser = async (req, res) => {
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

    const token = jwt.sign(
      { userId: user.id, email: user.email }, // payload
      "secretKey", // הסוד שלך
      { expiresIn: "1h" } // זמן תפוגה של ה-token (1 שעה)
    );

    // החזרת ה-Token יחד עם המידע על המשתמש
    res.status(200).json({
      token, // ה-token שנוצר
      user: user,
    });
  });
};

const upload = multer({
  dest: path.join(__dirname, "../client/public/images"), // שמירה ב-client/public/images
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// פונקציה לרישום ספק שירות
const registerProvider = (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    city_id,
    title,
    service_description,
    category_id, // קטגוריית השירות
    //logo, // קובץ הלוגו
  } = req.body;
  console.log("name is:", name);
  console.log(req.body);
  // אם יש לוגו, הוסף אותו לנתונים
  const logo = req.file ? `${req.file.filename}` : null; // השימוש בנתיב יחסי
  console.log("name is123:", name);
  console.log("logo :", logo);
  // בדיקה אם המייל כבר קיים במערכת
  const query = "SELECT * FROM service_web.service_providers WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }
    console.log("name is:", name);
    // הוספת בעל המקצוע לטבלה
    const insertQuery = `INSERT INTO service_web.service_providers 
      (name, phone, email, password, title, service_description, category_id, city_id, logo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      name,
      phone,
      email,
      password, // שמירת הסיסמה כפי שהיא, אפשר להוסיף הצפנה אם יש צורך
      title,
      service_description,
      category_id,
      city_id,
      logo, // הוספת הלוגו
    ];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({ error: "Database insert error" });
      }

      res.status(201).json({ message: "Provider registered successfully" });
    });
  });
};
const loginProvider = async (req, res) => {
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
    const token = jwt.sign(
      { userId: provider.id, email: provider.email }, // payload
      "secretKey", // הסוד שלך
      { expiresIn: "1h" } // זמן תפוגה של ה-token (1 שעה)
    );
    // החזרת ה-Token יחד עם המידע על המשתמש
    res.status(200).json({
      token, // ה-token שנוצר
      user: provider,
    });
  });
};

// כניסה ורישום לבעלי מקצוע ייעשה בדרך דומה
module.exports = { loginUser, registerUser, registerProvider, loginProvider };
