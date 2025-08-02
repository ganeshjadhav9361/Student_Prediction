const express = require("express");
const router = express.Router();
const performanceController = require("../controllers/performanceController.js");
const { verifyToken, requireRole } = require("../middleware/auth.js");


router.get("/performance/:id", verifyToken, requireRole("admin"), performanceController.getPerformanceForm);
router.post("/performance/:id", verifyToken, requireRole("admin"), performanceController.submitPerformance);

module.exports = router;
