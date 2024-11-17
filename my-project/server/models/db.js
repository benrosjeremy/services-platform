const mysql = require("mysql2");

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

module.exports = db;


// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const app = express();
// app.use(express.json());


// app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000", 
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//   })
// );



// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "service_web",
//   port: 3306,
// });