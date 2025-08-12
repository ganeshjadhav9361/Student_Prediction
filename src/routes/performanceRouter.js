const express = require("express");
const router = express.Router();
const performance = require("../controllers/performanceController.js");
const { verifyToken, isAdmin } = require("../middleware/accessMiddleware.js");

router.post("/performance/view", verifyToken, isAdmin, performance.viewForm);
//router.post("/performance/add", verifyToken, isAdmin, performance.addPerformance);
router.post("/performance/update", verifyToken, isAdmin, performance.updatePerformance);

module.exports = router;
