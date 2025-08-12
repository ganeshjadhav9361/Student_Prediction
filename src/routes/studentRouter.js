const express = require("express");
const router = express.Router();
let studentMiddleware=require("../middleware/accessMiddleware.js");
const studentCtrl = require("../controllers/studentController");

router.post("/addStudent",/*studentMiddleware.verifyToken,studentMiddleware.isAdmin*/ studentCtrl.addStudent);
router.get("/viewAllStudent",/*studentMiddleware.verifyToken,studentMiddleware.isAdmin,*/ studentCtrl.getAllStudents);
router.put("/updateStudent", /*studentMiddleware.verifyToken,studentMiddleware.isAdmin,*/ studentCtrl.updateStudent);
router.delete("/deleteStudent/:sid", /*studentMiddleware.verifyToken,studentMiddleware.isAdmin,*/ studentCtrl.deleteStudent);
module.exports = router;

