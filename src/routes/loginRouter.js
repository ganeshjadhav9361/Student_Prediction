const express = require("express");
const router = express.Router();
const loginCtrl = require("../controllers/loginController");
const { verifyToken } = require("../middleware/accessMiddleware");

router.post("/login", loginCtrl.validateLoginUser);

router.get("/admin/dashboard", verifyToken, (req, res) => {
    if (req.user.role === "admin") {
        console.log("Admin Dashboard Accessed");
        res.status(200).json({success: true,message: "Welcome to the admin dashboard",user: req.user.username});
    } else {
        res.status(403).json({ success: false, message: "Access Denied: Admins only." });
    }
});

router.get("/student/dashboard", verifyToken, (req, res) => {
    if (req.user.role === "student") {
        console.log("Student Dashboard Accessed");
        res.status(200).json({success: true,message: "Welcome to the student dashboard",user: req.user.username});
    } else {
        res.status(403).json({ success: false, message: "Access Denied: Students only." });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "You have been logged out successfully." });
});

module.exports = router;




