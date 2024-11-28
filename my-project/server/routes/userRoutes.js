const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController.js");
const historyController = require("../controllers/historyrequestController.js");

router.post("/create-service", userController.createServiceRequest);
router.post("/add-review", userController.addReview);
router.get("/get-categories", userController.GetCategories);
router.get("/get-cities", userController.GetCities);
router.get("/get-providers", userController.GetProviders);
router.get("/get-reviews", userController.GetReviews);
router.post("/history", historyController.getRequestsHistory);

module.exports = router;
