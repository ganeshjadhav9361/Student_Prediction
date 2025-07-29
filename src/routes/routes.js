let express = require("express");
let router = express.Router();

let studCtrl = require("../controllers/studentController.js");
let loginCtrl = require("../controllers/loginController.js");
let courseCtrl=require("../controllers/courseController.js");

router.get("/home", studCtrl.homePage);
router.get("/register", loginCtrl.registerController);
router.get("/validateuser", loginCtrl.validateLoginUser);
router.post("/registeruser", loginCtrl.registeruserdata);

router.post("/add", courseCtrl.createCourse);

module.exports = router;``