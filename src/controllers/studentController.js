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


exports.updateStudent = async (req, res) => {
  try {
    let { sid, name, email, contact, uid, cid } = req.body;

    if (!sid) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const result = await studentModel.updateStudent(sid, name, email, contact, uid, cid);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully" });
  } catch (error) {
    console.error("Update student error:", error);
    res.status(500).json({ message: "Failed to update student" });
  }
};
exports.getStudentById = async (req, res) => {
  const { sid } = req.params;

  if (!sid) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  try {
    const student = await studentModel.getStudentById(sid);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ error: "Error fetching student" });
  }
};
exports.getUnregisteredStudents = async (req, res) => {
  try {
    const data = await studentModel.getUnregisteredStudents();
    res.json({ data });
  } catch (err) {
    console.error("Error fetching unregistered students:", err);
    res.status(500).json({ error: err.message }); 
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

exports.getStudentProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    console.log("Fetching profile for uid:", uid);

    const results = await studentModel.getStudentProfile(uid);

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const uid = req.user.uid;
    const results = await studentModel.getStudentCourses(uid);

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No courses found" });
    }

    res.json(results);
  } catch (error) {
    console.error("Courses fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
