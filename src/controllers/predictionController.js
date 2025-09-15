const { getLatestPerformance, getHistoricalPerformance } = require("../models/performanceModel");
const { savePrediction, getLatestPredictionBySid,getShortlistedPredictions,  getAllPredictions } = require("../models/predictionModel");
const { runLinearRegression } = require("../utils/predictor");

exports.generatePrediction = async (req, res) => {
  const sid = req.params.sid;
  try {
    const latest = await getLatestPerformance(sid);
    if (!latest) return res.status(404).json({ error: "No performance data found" });

    const historical = await getHistoricalPerformance(sid); 

    const result = runLinearRegression(historical, latest);

    await savePrediction(
      sid,
      result.latest.readiness_level,
      result.latest.shortlisted,
      result.latest.suggestion
    );
    res.json({
      sid,
      predictedScore: result.latest.prediction.toFixed(2),
      readiness_level: result.latest.readiness_level,
      shortlisted: result.latest.shortlisted,
      suggestion:result.latest.suggestion,
      historical: result.historical, 
    });
  } catch (err) {
    console.error("Prediction error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getAllPredictions = async (req, res) => {
  try {
    const predictions = await getAllPredictions();
    res.json(predictions);
  } catch (err) {
    console.error("Fetch all predictions error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getLatestPrediction = async (req, res) => {
  try {
    const sid = req.user.sid; 
    const prediction = await getLatestPredictionBySid(sid);
    if (!prediction) {
      return res.status(404).json({ message: "No prediction found for this student" });
    }
    return res.status(200).json({ success: true, data: prediction });
  } catch (error) {
    console.error("Error in getLatestPrediction:", error.message);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getShortListedStudent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    const shortlisted = await getShortlistedPredictions();
    if (!shortlisted || shortlisted.length === 0) {
      return res.status(404).json({ message: "No shortlisted students found" });
    }
    return res.status(200).json({ success: true, data: shortlisted });
  } catch (error) {
    console.error("Error in getShortListedStudent:", error.message);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};