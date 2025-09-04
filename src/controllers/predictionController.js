const { getLatestPerformance, getHistoricalPerformance } = require("../models/performanceModel");
const { savePrediction, getLatestPredictionFromDB,  getAllPredictions } = require("../models/predictionModel");
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
    // Get student ID from query parameter
    const sid = parseInt(req.query.sid); // ?sid=123

    if (!sid) {
      return res.status(400).json({ error: "Student ID is required" });
    }

    const prediction = await getLatestPredictionFromDB(sid);

    if (!prediction) {
      return res.status(404).json({ error: "No prediction found for this student." });
    }

    res.json(prediction);
  } catch (err) {
    console.error("Fetch latest prediction error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};