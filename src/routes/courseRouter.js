
let express= require("express");
let router= express.Router();
let courseMiddleware=require("../middleware/accessMiddleware.js");
let courseCtrl=require("../controllers/courseController.js");

router.post("/addCourse",courseMiddleware.verifyToken,courseMiddleware.isAdmin, courseCtrl.createCourse);
router.get("/viewCourses",courseMiddleware.verifyToken,courseMiddleware.isAdmin,courseCtrl.getAllCourses);
router.get("/viewCourseById/:id",courseMiddleware.verifyToken,courseMiddleware.isAdmin, courseCtrl.getCourseById);
router.delete("/deleteCourse" ,courseMiddleware.verifyToken,courseMiddleware.isAdmin, courseCtrl.deleteCourse);
router.post("/updateCourse",courseMiddleware.verifyToken,courseMiddleware.isAdmin,courseCtrl.UpdateCourse);



module.exports = router;