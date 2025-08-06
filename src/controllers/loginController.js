const userModel = require("../models/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.secretkey;

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



















// let usermodel = require("../models/loginModel.js");
// let bcrypt = require("bcrypt");
// let jwt = require("jsonwebtoken");
// let secretKey = "ABCD#$1234";

// exports.validateLoginUser = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await usermodel.validateLoginUser(username, password);

//         if (user) {
//             const token = jwt.sign(
//                 {
//                     uid: user.uid,
//                     username: user.username,
//                     role: user.role
//                 },
//                 secretKey,
//                 { expiresIn: '1m' }
//             );

//             res.cookie("token", token);

//             console.log("Login successful, token generated:", token);

//             if (user.role === "admin") {
//                 // res.send("Login successful, redirecting to admin dashboard...");
//                 return res.render("adminDashboard.ejs", { loginUserName: user.username });
//             } else if (user.role === "student") {
//                 // res.send("Login successful, redirecting to student dashboard...");
//                 return res.render("studentDashboard.ejs", { loginUserName: user.username });
//             } else {
//                 return res.status(403).render("login.ejs", { msg: "Unauthorized role detected" });
//             }
//         } else {
//             console.log("Login failed: Invalid username or password");
//             return res.status(401).render("login.ejs", { msg: "Login Failed: Invalid username or password" });
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         return res.status(500).render("login.ejs", { msg: "Login Failed: Server error" });
//     }
// };

















// require("dotenv").config();
// let usermodel=require("../models/loginModel.js");
// let bcrypt=require("bcrypt");
// let jwt=require("jsonwebtoken");
// const secretKey = process.env.secretKey;

// exports.validateLoginUser = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await usermodel.validateLoginUser(username, password);

//         if (user) {
//             const token = jwt.sign(
//                 {
//                     uid: user.uid,
//                     username: user.username,
//                     role: user.role
//                 },
//                 secretKey,
//                 { expiresIn: '1h' }
//             );

//             res.cookie("token", token);
            
//             res.status(200).send("Login successful, token generated");
//             console.log("Login successful, token generated:", token);
//             // res.render("viewprofile.ejs", { loginUserName: user.username });
//         } else {
//             res.status(401).send("Login Failed: Invalid username or password");
//             // res.render("login.ejs", { msg: "Login Failed: Invalid username or password" });
//             console.log("Login failed: Invalid username or password");
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         //res.status(500).render("login.ejs", { msg: "Login Failed: Server error" });
//     res.status(500).send("Login Failed: Server error");
//     }
// };
