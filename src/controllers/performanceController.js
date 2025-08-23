const performanceModel = require("../models/performanceModel");

exports.viewForm = async (req, res) => {
    const { sid } = req.body;

    if (!sid) {
        return res.status(400).json({ success: false, message: "Student ID (sid) is required" });
    }

    try {
        const performance = await performanceModel.getPerformanceByStudentId(sid);

        if (!performance) {
            return res.status(404).json({ success: false, message: "Performance not found" });
        }

        res.status(200).json({ success: true, performance });
    } catch (error) {
        console.error("Error fetching performance:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.addPerformance = async (req, res) => {
    const { sid, attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score } = req.body;

    if (!sid) {
        return res.status(400).json({ success: false, message: "Student ID is required" });
    }

    const scores = [attendance_percentage, machine_test, mcq_test, mock_interview_score];
    if (!scores.every(score => !isNaN(score) && score >= 0 && score <= 10)) {
        return res.status(400).json({ success: false, message: "Scores must be between 0 and 10" });
    }

    try {
        await performanceModel.insertPerformance({ sid, attendance_percentage, machine_test, mcq_test, mock_interview_score });
        res.status(201).json({ success: true, message: "Performance added successfully" });
    } catch (error) {
        console.error("Error adding performance:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.updatePerformance = async (req, res) => {
    const { sid, attendance_percentage, machine_test, mcq_test, mock_interview_score } = req.body;

    if (!sid) {
        return res.status(400).json({ success: false, message: "Student ID is required" });
    }

    const scores = [attendance_percentage, machine_test, mcq_test, mock_interview_score];
    if (!scores.every(score => !isNaN(score) && score >= 0 && score <= 10)) {
        return res.status(400).json({ success: false, message: "Scores must be between 0 and 10" });
    }

    try {
        await performanceModel.updatePerformance({ sid, attendance_percentage, machine_test, mcq_test, mock_interview_score });
        res.status(200).json({ success: true, message: "Performance updated successfully" });
    } catch (error) {
        console.error("Error updating performance:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getConfirmedStudents = async (req, res) => {
  try {
    const students = await performanceModel.getConfirmedStudents();
    if (!students || students.length === 0) {
      return res.status(404).json({ success: false, message: "No confirmed students found" });
    }
    res.status(200).json({ success: true, students });
  } catch (err) {
    console.error("Error fetching confirmed students:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllPerformance = async (req, res) => {
  try {
    const results = await performanceModel.getAllPerformance(); 
    res.json({ students: results });   
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ message: "DB Error" });
  }
};







