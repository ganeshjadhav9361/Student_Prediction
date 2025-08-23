const studentModel = require("../models/studentModel");

//exports.addStudent = async (req, res) => {
//     const { name, email, contact, uid, cid } = req.body;
//     console.log("Adding student:", { name, email, contact, uid, cid });

//     try {
//         const result = await studentModel.addStudent(name, email, contact, uid, cid);
//         res.status(201).json({ message: "Student added", data: result });
//     } catch (err) {
//         console.error("Error in controller:", err);
//         res.status(500).json({ error: "Server error while adding student" });
//     }
// };
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
// exports.deleteStudent = (req, res) => {
//     const sid = req.params.sid;

//     if (!sid) {
//         return res.status(400).json({ error: "Student ID (sid) is required" });
//     }

//     studentModel.deleteStudent(sid)
//         .then((result) => {
//            if (result.affectedRows === 0) {
//               // No rows deleted → student not found
//                res.status(404).json({ error: "Student not found" });
//               } else {
//                  // Deletion successful
//                    res.json({ message: "Student deleted successfully" });
// }
//         })
//         .catch((err) => {
//             console.error("Error deleting student:", err);
//             res.status(500).json({ error: "Error deleting student" });
//         });
// }
exports.getUnregisteredStudents = async (req, res) => {
  try {
    const data = await studentModel.getUnregisteredStudents();
    res.json({ data });
  } catch (err) {
    console.error("Error fetching unregistered students:", err); // logs full error
    res.status(500).json({ error: err.message }); // send actual MySQL error to Postman
  }
};

// exports.addStudent = async (req, res) => {
//   try {
//     const { name, email, contact, uid, cid } = req.body;

//     if (!name || !email || !contact || !uid || !cid) {
//       return res.status(400).json({ message: "⚠ All fields are required" });
//     }

//     const result = await studentModel.addStudent(name, email, contact, uid, cid);
//     res.status(201).json({ message: "✅ Student added successfully", studentId: result.insertId });

//   } catch (error) {
//     console.error("Add student error:", error);
//     res.status(500).json({ message: "❌ Failed to add student" });
//   }
// };
exports.addStudent = async (req, res) => {
  try {
    const { name, email, contact, uid, cid } = req.body;

    if (!name || !email || !contact || !uid || !cid) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await studentModel.addStudent(name, email, contact, uid, cid);

    // ✅ Always send a response
    res.status(201).json({
      message: "Student added successfully",
      studentId: result.insertId,
    });
  } catch (err) {
    console.error("Add student error:", err);
    res.status(500).json({ message: "Failed to add student" });
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










exports.getProfile = async (req, res) => {
  const sid = req.params.sid;

  try {
    const student = await studentModel.getBySid(sid);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ data: student });
  } catch (err) {
    console.error("Error in getStudentProfile controller:", err);
    res.status(500).json({ error: "Server error while fetching student profile" });
  }
};
