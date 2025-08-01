let usermodel=require("../models/loginModel.js");
let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");
let secretKey="ABCD#$1234";

exports.validateLoginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await usermodel.validateLoginUser(username, password);

        if (user) {
            const token = jwt.sign(
                {
                    uid: user.uid,
                    username: user.username,
                    role: user.role
                },
                secretKey,
                { expiresIn: '1m' }
            );

            res.cookie("token", token);
            
            res.status(200).send("Login successful, token generated");
            console.log("Login successful, token generated:", token);
            // res.render("viewprofile.ejs", { loginUserName: user.username });
        } else {
            res.status(401).send("Login Failed: Invalid username or password");
            // res.render("login.ejs", { msg: "Login Failed: Invalid username or password" });
            console.log("Login failed: Invalid username or password");
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).render("login.ejs", { msg: "Login Failed: Server error" });
    }
};