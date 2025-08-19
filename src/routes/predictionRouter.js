const express = require("express");
const router = express.Router();
const predictionController = require("../controllers/predictionController");
const { verifyToken, isAdmin } = require("../middleware/accessMiddleware");

router.post("/train", verifyToken, isAdmin, predictionController.trainModel);

router.get("/predict/:sid", verifyToken, predictionController.predictForStudent);

module.exports = router;
