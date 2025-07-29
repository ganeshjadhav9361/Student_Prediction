
let express= require("express");
let router= express.Router();
let studCtrl = require("../controllers/studentController.js");

let loginCtrl = require("../controllers/loginController.js");

router.get("/", studCtrl.homePage);
router.get("/register", loginCtrl.registerController);
router.post("/validateuser", loginCtrl.validateLoginUser);
router.post("/registeruser", loginCtrl.registeruserdata);
router.post("/loginuserprofile",loginCtrl.getLoginUserProfile);

module.exports = router;