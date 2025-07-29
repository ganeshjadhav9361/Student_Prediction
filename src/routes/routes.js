let express= require("express");
let router= express.Router();
let studCtrl = require("../controllers/studentController.js");

router.get("/",studCtrl.homePage);



module.exports= router;