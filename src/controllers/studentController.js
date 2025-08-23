const studentModel = require("../models/studentModel");

exports.addStudent = async (req, res) => {
  try {
    const { name, email, contact, uid, cid } = req.body;

    if (!name || !email || !contact || !uid || !cid) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await studentModel.addStudent(name, email, contact, uid, cid);
    res.status(201).json({
      message: "Student added successfully",
      studentId: result.insertId,
    });
  } catch (err) {
    console.error("Add student error:", err);
    res.status(500).json({ message: "Failed to add student" });
  }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.getAllStudents();
        res.status(200).json({ data: students });
    } catch (err) {
        console.error("Error in controller:", err);
        res.status(500).json({ error: "Server error while fetching students" });
    }
};

exports.updateStudent = (req, res) => {
    const { sid, name, email, contact, uid, cid } = req.body;

    if (!sid) {
        return res.status(400).json({ error: "Student ID (sid) is required" });
    }

    studentModel.updateStudent(sid, name, email, contact, uid, cid)
        .then(() => {
            res.json({ message: "Student updated successfully" });
        })
        .catch((err) => {
            console.error("Error updating student:", err);
            res.status(500).json({ error: "Error updating student" });
        });
};
exports.getUnregisteredStudents = async (req, res) => {
  try {
    const data = await studentModel.getUnregisteredStudents();
    res.json({ data });
  } catch (err) {
    console.error("Error fetching unregistered students:", err); // logs full error
    res.status(500).json({ error: err.message }); // send actual MySQL error to Postman
  }
};



exports.deleteStudent = (req, res) => {
  const sid = req.params.sid;

  if (!sid) {
    return res.status(400).json({ error: "Student ID (sid) is required" });
  }

  studentModel.deleteStudent(sid)
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Student not found" });
      } else {
        res.json({ message: "Student deleted successfully" });
      }
    })
    .catch((err) => {
      console.error("Error deleting student:", err);
      res.status(500).json({ error: "Error deleting student" });
    });
};

