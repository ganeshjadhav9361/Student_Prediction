// const MLR = require("ml-regression").MultivariateLinearRegression;

// const categorize = (score) => {
//   if (score >= 80) return "High Ready";
//   if (score >= 50) return "Ready";
//   return "Not Ready";
// };

// const getSuggestion = (score) => {
//   if (score >= 80) return "Excellent performance, keep it up!";
//   if (score >= 50) return "Good progress, but there’s room for improvement.";
//   return "Needs significant improvement. Focus on weak areas.";
// };

// exports.runLinearRegression = (historical, latest) => {
//   const allRecords = [...historical, latest];

//   const X = [];
//   const Y = [];

//   allRecords.forEach((r) => {
//     const attendance = Number(r.attendance_percentage) || 0;
//     const machine = Number(r.machine_test) || 0;
//     const mcq = Number(r.mcq_test) || 0;
//     const mock = Number(r.mock_interview_score) || 0;
//     const percentage = Number(r.percentage) || 0;

//     if (attendance + machine + mcq + mock === 0) return;

//     X.push([attendance, machine, mcq, mock]);
//     Y.push(percentage);
//   });

//   if (X.length === 0) {
//     const fallbackScore = Number(latest.percentage) || 0;
//     const readiness_level = categorize(fallbackScore);
//     const shortlisted = fallbackScore >= 50 ? 1 : 0;

//     return {
//       latest: { prediction: fallbackScore, readiness_level, shortlisted, suggestion: getSuggestion(fallbackScore) },
//       historical: []
//     };
//   }
//   if (X.length === 1) {
//     const fallbackScore = Y[0];
//     const readiness_level = categorize(fallbackScore);
//     const shortlisted = fallbackScore >= 50 ? 1 : 0;

//     return {
//       latest: { prediction: fallbackScore, readiness_level, shortlisted, suggestion: getSuggestion(readiness_level) },
//       historical: allRecords.map((r, idx) => ({
//         per_id: r.per_id,
//         prediction: Y[idx] || 0,
//         readiness_level: categorize(Y[idx] || 0),
//         shortlisted: (Y[idx] || 0) >= 50 ? 1 : 0,
//         suggestion: getSuggestion(categorize(Y[idx] || 0)),
//       }))
//     };
//   }

//   const mlr = new MLR(X, Y);

//   const historicalResults = allRecords.map((r) => {
//     const features = [
//       Number(r.attendance_percentage) || 0,
//       Number(r.machine_test) || 0,
//       Number(r.mcq_test) || 0,
//       Number(r.mock_interview_score) || 0,
//     ];
//     const prediction = mlr.predict(features);
//     const readiness_level = categorize(prediction);
//     return {
//       per_id: r.per_id,
//       prediction,
//       readiness_level,
//       shortlisted: prediction >= 50 ? 1 : 0,
//       suggestion: getSuggestion(readiness_level),
//     };
//   });

//   return {
//     latest: historicalResults[historicalResults.length - 1],
//     historical: historicalResults,
//   };
// };

// const MLR = require("ml-regression").MultivariateLinearRegression;

// // 🔹 Categorize readiness level
// const categorize = (score) => {
//   if (score >= 80) return "High Ready";
//   if (score >= 50) return "Ready";
//   return "Not Ready";
// };

// // 🔹 Generate suggestion (always use numeric score, not string!)
// const getSuggestion = (score) => {
//   if (score >= 80) return "Excellent performance, keep it up!";
//   if (score >= 50) return "Good progress, but there’s room for improvement.";
//   return "Needs significant improvement. Focus on weak areas.";
// };

// exports.runLinearRegression = (historical, latest) => {
//   const allRecords = [...historical, latest];

//   const X = [];
//   const Y = [];

//   allRecords.forEach((r) => {
//     const attendance = Number(r.attendance_percentage) || 0;
//     const machine = Number(r.machine_test) || 0;
//     const mcq = Number(r.mcq_test) || 0;
//     const mock = Number(r.mock_interview_score) || 0;
//     const percentage = Number(r.percentage) || 0;

//     if (attendance + machine + mcq + mock === 0) return;

//     X.push([attendance, machine, mcq, mock]);
//     Y.push(percentage);
//   });

//   // 🔹 Case 1: No data → fallback on latest record
//   if (X.length === 0) {
//     const fallbackScore = Number(latest.percentage) || 0;
//     return {
//       latest: {
//         prediction: fallbackScore,
//         readiness_level: categorize(fallbackScore),
//         shortlisted: fallbackScore >= 50 ? 1 : 0,
//         suggestion: getSuggestion(fallbackScore), // ✅ fixed
//       },
//       historical: [],
//     };
//   }

//   // 🔹 Case 2: Only one record → directly use percentage
//   if (X.length === 1) {
//     const fallbackScore = Y[0];
//     return {
//       latest: {
//         prediction: fallbackScore,
//         readiness_level: categorize(fallbackScore),
//         shortlisted: fallbackScore >= 50 ? 1 : 0,
//         suggestion: getSuggestion(fallbackScore), // ✅ fixed
//       },
//       historical: allRecords.map((r, idx) => {
//         const score = Y[idx] || 0;
//         return {
//           per_id: r.per_id,
//           prediction: score,
//           readiness_level: categorize(score),
//           shortlisted: score >= 50 ? 1 : 0,
//           suggestion: getSuggestion(score), // ✅ fixed
//         };
//       }),
//     };
//   }

//   // 🔹 Case 3: Multiple records → use regression
//   const mlr = new MLR(X, Y);

//   const historicalResults = allRecords.map((r) => {
//     const features = [
//       Number(r.attendance_percentage) || 0,
//       Number(r.machine_test) || 0,
//       Number(r.mcq_test) || 0,
//       Number(r.mock_interview_score) || 0,
//     ];
//     const prediction = mlr.predict(features);
//     return {
//       per_id: r.per_id,
//       prediction,
//       readiness_level: categorize(prediction),
//       shortlisted: prediction >= 50 ? 1 : 0,
//       suggestion: getSuggestion(prediction), // ✅ fixed
//     };
//   });

//   return {
//     latest: historicalResults[historicalResults.length - 1],
//     historical: historicalResults,
//   };
// };


const MLR = require("ml-regression").MultivariateLinearRegression;

const categorize = (score) => {
  if (score >= 80) return "High Ready";
  if (score >= 50) return "Ready";
  return "Not Ready";
};

const getSuggestion = (score) => {
  if (score >= 80) return "Excellent performance, keep it up!";
  if (score >= 50) return "Good progress, but there’s room for improvement.";
  return "Needs significant improvement. Focus on weak areas.";
};

exports.runLinearRegression = (historical, latest) => {
  const allRecords = [...historical, latest];

  const X = [];
  const Y = [];

  allRecords.forEach((r) => {
    const attendance = Number(r.attendance_percentage) || 0;
    const machine = Number(r.machine_test) || 0;
    const mcq = Number(r.mcq_test) || 0;
    const mock = Number(r.mock_interview_score) || 0;
    const percentage = Number(r.percentage) || 0;

    // skip rows with no data
    if (attendance + machine + mcq + mock === 0) return;

    X.push([attendance, machine, mcq, mock]);
    Y.push(percentage);
  });

  // 🔹 Case 1: No valid records → fallback on latest.percentage
  if (X.length === 0) {
    const fallbackScore = Number(latest?.percentage) || 0;
    return {
      latest: {
        prediction: fallbackScore,
        readiness_level: categorize(fallbackScore),
        shortlisted: fallbackScore >= 50 ? 1 : 0,
        suggestion: getSuggestion(fallbackScore),
      },
      historical: [],
    };
  }

  // 🔹 Case 2: Only one valid record → don’t run regression
  if (X.length === 1) {
    const fallbackScore = Y[0];
    return {
      latest: {
        prediction: fallbackScore,
        readiness_level: categorize(fallbackScore),
        shortlisted: fallbackScore >= 50 ? 1 : 0,
        suggestion: getSuggestion(fallbackScore),
      },
      historical: allRecords.map((r, idx) => {
        const score = Y[idx] || 0;
        return {
          per_id: r.per_id,
          prediction: score,
          readiness_level: categorize(score),
          shortlisted: score >= 50 ? 1 : 0,
          suggestion: getSuggestion(score),
        };
      }),
    };
  }

  // 🔹 Case 3: Multiple records → safe regression
  let mlr;
  try {
    mlr = new MLR(X, Y);
  } catch (err) {
    console.error("⚠️ Regression failed, fallback:", err.message);
    const fallbackScore = Number(latest?.percentage) || 0;
    return {
      latest: {
        prediction: fallbackScore,
        readiness_level: categorize(fallbackScore),
        shortlisted: fallbackScore >= 50 ? 1 : 0,
        suggestion: getSuggestion(fallbackScore),
      },
      historical: [],
    };
  }

  const historicalResults = allRecords.map((r) => {
    const features = [
      Number(r.attendance_percentage) || 0,
      Number(r.machine_test) || 0,
      Number(r.mcq_test) || 0,
      Number(r.mock_interview_score) || 0,
    ];
    const prediction = mlr.predict(features);
    return {
      per_id: r.per_id,
      prediction,
      readiness_level: categorize(prediction),
      shortlisted: prediction >= 50 ? 1 : 0,
      suggestion: getSuggestion(prediction),
    };
  });

  return {
    latest: historicalResults[historicalResults.length - 1],
    historical: historicalResults,
  };
};
