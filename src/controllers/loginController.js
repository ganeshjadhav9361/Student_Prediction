const userModel = require("../models/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.secret_key;

exports.validateLoginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.validateLoginUser(username);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    uid: user.uid,
                    username: user.username,
                    role: user.role
                },
                secretKey,
                { expiresIn: "1m" }
            );

            res.cookie("token", token); 

            console.log("Login successful, token generated:", token);

            if (user.role === "admin") {
                console.log("User role is admin, redirecting to admin dashboard");
                return res.render("adminDashboard.ejs", { loginUserName: user.username });
            } else if (user.role === "student") {
                console.log("User role is student, redirecting to student dashboard");
                return res.render("studentDashboard.ejs", { loginUserName: user.username });
            } else {
                return res.status(403).render("login.ejs", { msg: "Unauthorized role detected" });
            }
        } else {
            console.log("Login failed: Invalid username or password");
            return res.status(401).render("login.ejs", { msg: "Login Failed: Invalid username or password" });
        }
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).render("login.ejs", { msg: "Login Failed: Server error" });
    }
};

