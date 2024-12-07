const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

let uploadCounter = 0;
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../client/public/images"), // Path to save the uploaded files
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uploadCounter++}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName); // Generate a unique filename
  },
});

const upload = multer({ storage });

const userController = require("../controllers/userController.js");
const historyController = require("../controllers/historyrequestController.js");

router.post(
  "/create-service",
  upload.array("images"), // קבלת תמונות מרובות
  userController.createServiceRequest
);
router.post("/add-review", userController.addReview);
router.get("/get-categories", userController.GetCategories);
router.get("/get-cities", userController.GetCities);
router.get("/get-providers", userController.GetProviders);
router.get("/get-reviews", userController.GetReviews);
router.post("/history", historyController.getRequestsHistory);

module.exports = router;
