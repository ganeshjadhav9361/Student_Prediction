const express = require("express");
const router = express.Router();
const { generatePrediction,getLatestPrediction,getShortListedStudent, getAllPredictions } = require("../controllers/predictionController");
const { verifyToken } = require("../middleware/accessMiddleware");

router.get("/predict/:sid", verifyToken, generatePrediction);
router.get("/prediction/all", verifyToken, getAllPredictions);
router.get("/prediction/latest", verifyToken, getLatestPrediction);
router.get("/prediction/shortlisted",verifyToken,getShortListedStudent)

module.exports = router;
