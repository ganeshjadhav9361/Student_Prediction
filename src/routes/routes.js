
let express= require("express");
let router= express.Router();
let studCtrl = require("../controllers/studentController.js");

let loginCtrl = require("../controllers/loginController.js");
let courseCtrl=require("../controllers/courseController.js");
let registerCtrl= require("../controllers/registerController.js");

router.get("/home", studCtrl.homePage);
router.get("/register", loginCtrl.registerController);
router.post("/validateuser", loginCtrl.validateLoginUser);
router.post("/registeruser", loginCtrl.registeruserdata);
router.post("/loginuserprofile",loginCtrl.getLoginUserProfile);

router.post("/add", courseCtrl.createCourse);

module.exports = router;``