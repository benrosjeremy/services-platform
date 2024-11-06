const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
// const authRoutes = require('./routes/auth');
// const servicesRoutes = require('./routes/services');
// const providersRoutes = require('./routes/providers');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "service_web",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Routes
// app.use('/api/auth', authRoutes(db)); // Pass db to routes
// app.use('/api/services', servicesRoutes(db));
// app.use('/api/providers', providersRoutes(db));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/api/Providers", (req, res) => {
  const query = "SELECT * FROM service_web.service_providers"; // כאן תשים את שם הטבלה שלך
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "אירעה שגיאה בשרת" });
    } else {
      res.json(results); // שולחים את התוצאות כ-JSON
    }
  });
});

app.get("/api/Categories", (req, res) => {
  const query = "SELECT * FROM service_web.service_categories"; // כאן תשים את שם הטבלה שלך
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "אירעה שגיאה בשרת" });
    } else {
      res.json(results); // שולחים את התוצאות כ-JSON
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
