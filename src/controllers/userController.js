const usermodel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "ABCD#$1234"; 
exports.userController = (req, res) => {
    res.status(200).json({ success: true, message: "User controller active" });
};

exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    const encPass = bcrypt.hashSync(password, 8);

    try {
        const result = await usermodel.registerUser(username, encPass, role);

        if (result.affectedRows >= 1) {
            res.status(201).json({success: true,message: "Registration successful"});
        } else {
            res.status(400).json({success: false,message: "Registration failed"});
        }
    } catch (err) {
        console.error("Error in registration controller:", err);
        res.status(500).json({success: false,message: "Server error while registering",error: err.message});
    }
};





































// let usermodel=require("../models/userModel.js");
// let bcrypt=require("bcrypt");
// let jwt=require("jsonwebtoken");
// let secretKey="ABCD#$1234";

// exports.userController=(req,res)=>{
//     res.send("i am user controller");
//     //res.render("user.ejs",{msg:""});
// }

// exports.registerUser = async (req, res) => {
//     let { username, password, role } = req.body;
//     let encPass = bcrypt.hashSync(password, 8);

//     try {
//         let result = await usermodel.registerUser(username, encPass, role);
//         if (result.affectedRows >= 1) {
//             res.send("register success");
//            // res.render("user.ejs", { msg: "Registration successfully........." });
//         } else {
//             res.send("register failed....");
//             //res.render("user.ejs", { msg: "Registration failed............" });
//         }
//     } catch (err) {
//         console.error("Error in registration controller:", err);
//         res.send(err);
//         //res.render("user.ejs", { msg: "Server error while registration" });
//     }
// }
