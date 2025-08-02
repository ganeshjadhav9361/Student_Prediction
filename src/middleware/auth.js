const jwt = require("jsonwebtoken");
const secretKey = process.env.secret_key;
require ("dotenv").config();
function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).render("login.ejs", { msg: "Access Denied. Please login." });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).render("login.ejs", { msg: "Invalid or expired token." });
        }

        req.user = user; 
        next();
    });
}

function requireRole(role) {
    return (req, res, next) => {
        if (req.user?.role !== role) {
            return res.status(403).render("login.ejs", { msg: "Access Denied: You are not authorized." });
        }
        next();
    };
}

module.exports = {
    verifyToken,
    requireRole
};
