const db = require("../../db");

exports.savePrediction = async (sid, readiness_level, shortlisted,suggestion) => {
  const [result] = await db.query(
    "INSERT INTO prediction (sid, readiness_level, shortlisted,suggestion) VALUES (?, ?, ?, ?)",
    [sid, readiness_level, shortlisted,suggestion]
  );
  return result.insertId;
};

exports.getAllPredictions = async () => {
  const [rows] = await db.query(
    `SELECT s.name, s.email, p.readiness_level, p.shortlisted,p.suggestion, p.created_at
FROM prediction p
JOIN students s ON p.sid = s.sid
ORDER BY p.created_at ASC;
`
  );
  return rows;
};


exports.getLatestPredictionFromDB = async (sid) => {
  const [rows] = await db.query(
    `SELECT s.name, s.email, p.readiness_level, p.shortlisted, p.suggestion, p.created_at
     FROM prediction p
     JOIN students s ON p.sid = s.sid
     WHERE p.sid = ?
     ORDER BY p.created_at DESC
     LIMIT 1;`,
    [sid]
  );
  return rows[0]; // undefined if no prediction exists
};