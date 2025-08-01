let express=require("express");
let router=express.Router();

let loginCtrl=require("../controllers/loginController.js");

router.post("/login",loginCtrl.validateLoginUser);

module.exports=router