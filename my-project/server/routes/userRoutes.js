const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController.js");

router.post("/create-service", userController.createServiceRequest);
router.get("/get-categories", userController.GetCategories);
router.get("/get-cities", userController.GetCities);
router.get("/get-providers", userController.GetProviders);

module.exports = router;
