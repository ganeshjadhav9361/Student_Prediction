const express = require("express");
const router = express.Router();
const performanceController = require("../controllers/performanceController.js");
// const  verifyToken = require("../middleware/auth.js");
const  accessMiddle = require("../middleware/accessMiddleware.js");


router.get("/performance/:id", accessMiddle.verifyToken, accessMiddle.isAdmin, performanceController.getPerformanceForm);
router.post("/performance/:id", accessMiddle.verifyToken, accessMiddle.isAdmin, performanceController.submitPerformance);

module.exports = router;
