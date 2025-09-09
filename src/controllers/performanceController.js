const performanceModel = require("../models/performanceModel");
const { runLinearRegression } = require("../utils/predictor");
const { savePrediction } = require("../models/predictionModel");
const predictionModel=require("../models/predictionModel");
exports.addPerformance = async (req, res) => {
  const { sid, attendance_percentage, machine_test, mcq_test, mock_interview_score } = req.body;

  if (!sid) {
    return res.status(400).json({ success: false, message: "Student ID is required" });
  }

  const scores = [attendance_percentage, machine_test, mcq_test, mock_interview_score];
  if (!scores.every(score => !isNaN(score) && score >= 0 && score <= 10)) {
    return res.status(400).json({ success: false, message: "Scores must be between 0 and 10" });
  }

  try {
    await performanceModel.insertPerformance({ sid, attendance_percentage, machine_test, mcq_test, mock_interview_score });

    const latest = await performanceModel.getLatestPerformance(sid);
    const historical = await performanceModel.getHistoricalPerformance(sid);

    const result = runLinearRegression(historical, latest);

    await savePrediction(
      sid,
      result.latest.readiness_level,
      result.latest.shortlisted,
      result.latest.suggestion
    );

    res.status(201).json({
      success: true,
      message: "Performance and prediction saved successfully",
      performance: latest,
      prediction: {
        predictedScore: result.latest.prediction.toFixed(2),
        readiness_level: result.latest.readiness_level,
        shortlisted: result.latest.shortlisted,
        suggestion: result.latest.suggestion
      }
    });

  } catch (error) {
    console.error("Error adding performance:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getPerformanceByStudentId = async (req, res) => {
    const sid = req.body;
    
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

exports.getStudentPerformance = async (req, res) => {
  try {
    const uid = req.user.uid; 

    const performances = await performanceModel.getPerformanceByUid(uid);

    if (!performances || performances.length === 0) {
      return res.status(404).json({ error: "No performance records found" });
    }

    res.status(200).json({ data: performances });
  } catch (err) {
    console.error("Error fetching performance:", err);
    res.status(500).json({ error: "Server error while fetching performance" });
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

    const latest = await performanceModel.getLatestPerformance(sid);
    const historical = await performanceModel.getHistoricalPerformance(sid);

    const result = runLinearRegression(historical, latest);

    const latestPrediction = await predictionModel.getLatestPredictionBySid(sid);
    if (latestPrediction) {
      await predictionModel.updatePrediction({
        pre_id: latestPrediction.pre_id,
        readiness_level: result.latest.readiness_level,
        shortlisted: result.latest.shortlisted,
        suggestion: result.latest.suggestion
      });
    } else {
  
      await predictionModel.savePrediction(
        sid,
        result.latest.readiness_level,
        result.latest.shortlisted,
        result.latest.suggestion
      );
    }

    res.status(200).json({
      success: true,
      message: "Performance & Prediction updated successfully",
      performance: latest,
      prediction: {
        predictedScore: result.latest.prediction.toFixed(2),
        readiness_level: result.latest.readiness_level,
        shortlisted: result.latest.shortlisted,
        suggestion: result.latest.suggestion
      }
    });

  } catch (error) {
    console.error("Error updating performance:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


