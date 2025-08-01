
let express= require("express");
let router= express.Router();
let courseMiddleware=require("../middleware/courseMiddleware.js");
let courseCtrl=require("../controllers/courseController.js");

router.post("/addCourse", courseCtrl.createCourse);
router.get("/viewCourses",courseCtrl.getAllCourses);
router.get("/viewCourseById/:id", courseCtrl.getCourseById);
router.delete("/deleteCourse" ,courseMiddleware.verifyToken,courseMiddleware.isAdmin, courseCtrl.deleteCourse);
router.post("/updateCourse", courseCtrl.UpdateCourse);



module.exports = router;