const db = require("../../db");

exports.savePrediction = async (sid, readiness_level, shortlisted,suggestion) => {
  const [result] = await db.query(
    "insert into prediction (sid, readiness_level, shortlisted,suggestion) values (?, ?, ?, ?)",
    [sid, readiness_level, shortlisted,suggestion]
  );
  return result.insertId;
};

exports.getAllPredictions = async () => {
  const [rows] = await db.query(
    `select s.name, s.email, p.readiness_level, p.shortlisted,p.suggestion, p.created_at
    from prediction p join students s on p.sid = s.sid order by p.created_at asc;`
  );
  return rows;
};

exports.getLatestPredictionBySid = async (sid) => {
  const query = `select * from prediction where sid = ? order by created_at desc limit 1`;
  try {
    const [rows] = await db.query(query, [sid]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error("DB error in getLatestPredictionBySid:", err.message);
    throw err;
  }
};

exports.getShortlistedPredictions = async () => {
  const query = `select s.name, s.email, p.readiness_level, p.shortlisted, p.suggestion, p.created_at
    from prediction p join students s on p.sid = s.sid where p.pre_id in (
      select max(pre_id) from prediction group by sid) and p.shortlisted = 1
    order by p.created_at asc;`;
  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (err) {
    console.error("DB error in getShortlistedPredictions:", err.message);
    throw err;
  }
};
exports.updatePrediction = async ({ pre_id, readiness_level, shortlisted, suggestion }) => {
  const query = `update prediction set readiness_level = ?, shortlisted = ?, suggestion = ?
    where pre_id = ?`;
  return db.query(query, [readiness_level, shortlisted, suggestion, pre_id]);
};