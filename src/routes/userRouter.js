let express= require("express");
let router= express.Router();

let userCtrl= require("../controllers/userController.js");

router.get("/user",userCtrl.userController);
router.post("/register", userCtrl.registerUser);


module.exports=router;