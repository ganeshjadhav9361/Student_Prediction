const express = require("express");
const router = express.Router();
const performance = require("../controllers/performanceController.js");
const { verifyToken, isAdmin } = require("../middleware/accessMiddleware.js");

router.post("/performance/view", verifyToken, isAdmin, performance.getPerformanceByStudentId);
router.post("/performance/add", verifyToken, isAdmin, performance.addPerformance);
router.post("/performance/update", verifyToken, isAdmin, performance.updatePerformance);
router.get("/performance/students", performance.getConfirmedStudents);
router.get("/performance/all", verifyToken, isAdmin,  performance.getAllPerformance);
router.get("/performance/each", verifyToken, performance.getStudentPerformance);


module.exports = router;

