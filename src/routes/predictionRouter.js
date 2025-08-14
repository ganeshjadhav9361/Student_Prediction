const express = require("express");
const router = express.Router();
const predictionController = require("../controllers/predictionController");
const { verifyToken, isAdmin } = require("../middleware/accessMiddleware");

// Train model (admin only)
router.post("/train", verifyToken, isAdmin, predictionController.trainModel);

// Predict for a specific student by sid
router.get("/predict/:sid", verifyToken, predictionController.predictForStudent);

module.exports = router;
