const express = require("express");
const router = express.Router();
const studentCtrl = require("../controllers/studentController");

router.post("/students", studentCtrl.addStudent);
router.get("/viewAllStudent", studentCtrl.getAllStudents);
router.put("/updateStudent", studentCtrl.updateStudent);
router.delete("/deleteStudent/:sid", studentCtrl.deleteStudent);
router.get("/unregistered-students", studentCtrl.getUnregisteredStudents);

module.exports = router;

