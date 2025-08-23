// const MLR = require("ml-regression").MultivariateLinearRegression;

// let mlrModel = null;

// exports.train = (rows) => {
//     const X = rows.map(r => [
//         parseFloat(r.attendance_percentage),
//         parseFloat(r.machine_test),
//         parseFloat(r.mcq_test),
//         parseFloat(r.mock_interview_score)
//     ]);
//     const y = rows.map(r => parseFloat(r.final_score));

//     mlrModel = new MLR(X, y);
//     return mlrModel.weights;
// };

// exports.predict = (input) => {
//     if (!mlrModel) return null;
//     return mlrModel.predict([
//         parseFloat(input.attendance_percentage),
//         parseFloat(input.machine_test),
//         parseFloat(input.mcq_test),
//         parseFloat(input.mock_interview_score)
//     ]);
// };
