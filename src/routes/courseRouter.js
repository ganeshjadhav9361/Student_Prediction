let express= require("express");
let router= express.Router();
let courseCtrl=require("../controllers/courseController.js");


router.post("/addCourse", courseCtrl.createCourse);
router.get("/viewCourses", courseCtrl.getAllCourses);
router.get("/viewCourseById/:id", courseCtrl.getCourseById);
router.delete("/deleteCourse/:cid",  courseCtrl.deleteCourse);
router.put("/updateCourse", courseCtrl.UpdateCourse);

module.exports = router;
