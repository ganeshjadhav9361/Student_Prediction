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
                { expiresIn: '1h' }
            );

            res.cookie("token", token); 

            res.render("viewprofile.ejs", { loginUserName: user.username });
        } else {
            res.render("login.ejs", { msg: "Login Failed: Invalid username or password" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.render("login.ejs", { msg: "Login Failed: Server error" });
    }
};