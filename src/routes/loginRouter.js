const express = require("express");
const router = express.Router();
const loginCtrl = require("../controllers/loginController");
const { verifyToken, requireRole } = require("../middleware/auth.js");

router.post("/login", loginCtrl.validateLoginUser);

router.get("/admin/dashboard", verifyToken, requireRole("admin"), (req, res) => {
    res.render("adminDashboard.ejs", { loginUserName: req.user.username });
});

router.get("/student/dashboard", verifyToken, requireRole("student"), (req, res) => {
    res.render("studentDashboard.ejs", { loginUserName: req.user.username });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token"); 
    res.render("login.ejs", { msg: "You have been logged out successfully." });
});

module.exports = router;

