// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

router.post("/register", authController.registerUser); // רישום לקוח
router.post("/register-provider", authController.registerProvider); // רישום בעל מקצוע
router.post("/login", authController.loginUser); // התחברות לקוח
router.post("/login-provider", authController.loginProvider); // התחברות בעל מקצוע

module.exports = router;
