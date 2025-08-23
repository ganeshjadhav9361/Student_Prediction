// const predictionModel = require("../models/predictionModel");
// const regression = require("../utils/regression");

// exports.trainModel = async (req, res) => {
//     try {
//         const data = await predictionModel.getAllPerformanceData();
//         if (data.length < 2) {
//             return res.status(400).json({ message: "Not enough data to train the model" });
//         }

//         const weights = regression.train(data);
//         res.json({ message: "Model trained successfully", weights });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error training model" });
//     }
// };

// exports.predictForStudent = async (req, res) => {
//     try {
//         const sid = req.params.sid;
//         const perfData = await predictionModel.getPerformanceByStudentId(sid);

//         if (!perfData) {
//             return res.status(404).json({ message: "No performance data found for this student" });
//         }

//         const prediction = regression.predict(perfData);
//         if (prediction === null) {
//             return res.status(400).json({ message: "Model not trained yet" });
//         }

//         res.json({ sid, predicted_final_score: prediction });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error predicting score" });
//     }
// };
