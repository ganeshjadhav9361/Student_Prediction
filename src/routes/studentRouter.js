const express = require("express");
const router = express.Router();
const studentCtrl = require("../controllers/studentController");
const {verifyToken}=require("../middleware/accessMiddleware");

router.post("/students", studentCtrl.addStudent);
router.get("/viewAllStudent", studentCtrl.getAllStudents);
router.put("/updateStudent", studentCtrl.updateStudent);
router.get("/students/:sid", studentCtrl.getStudentById);
router.delete("/deleteStudent/:sid", studentCtrl.deleteStudent);
router.get("/unregistered-students", studentCtrl.getUnregisteredStudents);
router.get("/profile", verifyToken, studentCtrl.getStudentProfile);
router.get("/courses", verifyToken, studentCtrl.getStudentCourses);

module.exports = router;

