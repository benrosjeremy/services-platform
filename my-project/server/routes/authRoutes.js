// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images"), // Path to save the uploaded files
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});
const upload = multer({ storage });

router.post("/register", authController.registerUser); // רישום לקוח
router.post(
  "/register-provider",
  upload.single("logo"),
  authController.registerProvider
); // רישום בעל מקצוע
router.post("/login", authController.loginUser); // התחברות לקוח
router.post("/login-provider", authController.loginProvider); // התחברות בעל מקצוע

module.exports = router;
