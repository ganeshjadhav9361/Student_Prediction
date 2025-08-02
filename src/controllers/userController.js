let usermodel=require("../models/userModel.js");
let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");
let secretKey="ABCD#$1234";

exports.userController=(req,res)=>{
    res.send("i am user controller");
    //res.render("user.ejs",{msg:""});
}

exports.registerUser = async (req, res) => {
    let { username, password, role } = req.body;
    let encPass = bcrypt.hashSync(password, 8);

    try {
        let result = await usermodel.registerUser(username, encPass, role);
        if (result.affectedRows >= 1) {
            res.send("register success");
           // res.render("user.ejs", { msg: "Registration successfully........." });
        } else {
            res.send("register failed....");
            //res.render("user.ejs", { msg: "Registration failed............" });
        }
    } catch (err) {
        console.error("Error in registration controller:", err);
        res.send(err);
        //res.render("user.ejs", { msg: "Server error while registration" });
    }
}
