const studentModel = require("../models/studentModel");

exports.addStudent = async (req, res) => {
    const { name, email, contact, uid, cid } = req.body;
    console.log("Adding student:", { name, email, contact, uid, cid });

    try {
        const result = await studentModel.addStudent(name, email, contact, uid, cid);
        res.status(201).json({ message: "Student added", data: result });
    } catch (err) {
        console.error("Error in controller:", err);
        res.status(500).json({ error: "Server error while adding student" });
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
// exports.updateStudent = async (req, res) => {
//     const { sid, name, email, contact, uid, cid } = req.body;

//     if (!sid || !name || !email || !contact || !uid || !cid) {
//         return res.status(400).json({ error: "All fields are required" });
//     }
//     try {
//         await studentModel.updateStudent(sid, name, email, contact, uid, cid);
//         res.json({ message: "Student updated successfully" });
//     } catch (err) {
//         console.error("Update student error:", err);
//         res.status(500).json({ error: "Failed to update student" });
//     }
// };
exports.updateStudent = (req, res) => {
    const { sid, name, email, contact, uid, cid } = req.body;

    if (!sid) {
        return res.status(400).json({ error: "Student ID (sid) is required" });
    }

    const updateData = { name, email, contact, uid, cid };

    studentModel.updateStudent(sid, updateData)
        .then((result) => {
            res.json({ message: result });
        })
        .catch((err) => {
            console.error("Error updating student:", err);
            res.status(500).json({ error: "Error updating student" });
        });
};
exports.deleteStudent = (req, res) => {
    const sid = req.params.sid;

    if (!sid) {
        return res.status(400).json({ error: "Student ID (sid) is required" });
    }

    studentModel.deleteStudent(sid)
        .then((result) => {
           if (result.affectedRows === 0) {
              // No rows deleted → student not found
               res.status(404).json({ error: "Student not found" });
              } else {
                 // Deletion successful
                   res.json({ message: "Student deleted successfully" });
}
        })
        .catch((err) => {
            console.error("Error deleting student:", err);
            res.status(500).json({ error: "Error deleting student" });
        });
}
// exports.deleteStudent = async (req, res) => {
//     const { sid } = req.params;

//     try {
//         await studentModel.deleteStudent(sid);
//         res.json({ message: "Student deleted successfully" });
//     } catch (err) {
//         console.error("Delete student error:", err);
//         res.status(500).json({ error: "Failed to delete student" });
//     }
// };