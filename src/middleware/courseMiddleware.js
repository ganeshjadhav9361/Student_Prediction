require("dotenv").config();
const secretKey = process.env.secretKey;
const jwt = require("jsonwebtoken");
const SECRET_KEY = secretKey; 

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token; // 🔥 Get token from cookie

    if (!token) {
        return res.status(401).json({ error: "No token found in cookies." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); 
    } else {
        res.status(403).json({ error: "Access denied. Admins only." });
    }
};
