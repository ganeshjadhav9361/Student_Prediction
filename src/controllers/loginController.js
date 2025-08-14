const userModel = require("../models/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.secretkey;

exports.validateLoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.validateLoginUser(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    uid: user.uid,
                    email: user.email,
                    role: user.role
                },
                secretKey,
                { expiresIn: "1h" }
            );

            res.cookie("token", token);

            console.log("Login successful, token generated:", token);

                if (user.role === "admin") {
                console.log("Admin dashboard");
            } else if (user.role === "student") {
                console.log("Student dashboard");
            }
            
            return res.status(200).json({success: true,message: "Login successful",
                token,  user: {uid: user.uid,username: user.username,role: user.role}
            });
        } else {
            console.log("Login failed: Invalid username or password");
            return res.status(401).json({success: false,message: "Login Failed: Invalid username or password"});
        }
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({success: false,message: "Login Failed: Server error"});
    }
};
