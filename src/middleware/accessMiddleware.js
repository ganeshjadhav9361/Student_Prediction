require("dotenv").config();
const secretKey = process.env.secretKey;
const jwt = require("jsonwebtoken");
const SECRET_KEY = secretKey; 

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token from cookie:", token); 
    if (!token) {
        return res.status(401).json({ error: "No token found in cookies." });
    }

    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        req.user = decoded;
        console.log("Decoded user:", decoded);
        next();
    } catch (err) {
        console.error("Token error:", err); 
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};
exports.isAdmin = (req, res, next) => {
    console.log("Checking admin for user:", req.user); 
    if (req.user && req.user.role === "admin") {
        return next();
    }
    res.status(403).json({ error: "Access denied. Admins only." });
};

