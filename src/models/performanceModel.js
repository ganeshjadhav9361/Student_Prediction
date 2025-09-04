const conn = require("../../db");

exports.getPerformanceByStudentId = async (sid) => {
    const [rows] = await conn.query(
        "SELECT * FROM performance WHERE sid = ? ORDER BY created_at DESC LIMIT 1",
        [sid]
    );
    return rows[0] || null;
};


exports.insertPerformance = async (data) => {
    const { sid, attendance_percentage, machine_test, mcq_test, mock_interview_score } = data;

    const final_score = Number(attendance_percentage || 0) + Number(machine_test || 0) + Number(mcq_test || 0) + Number(mock_interview_score || 0);
    const weight_score = (attendance_percentage || 0)*0.1 + (machine_test || 0)*0.3 + (mcq_test || 0)*0.3 + (mock_interview_score || 0)*0.3;
    const percentage=(weight_score/10)*100;

    const query = "insert into performance (sid, attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score, percentage) values (?, ?, ?, ?, ?, ?, ?)";
    return conn.query(query, [sid, attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score, percentage]);
};



exports.updatePerformance = async (data) => {
    const { sid, attendance_percentage, machine_test, mcq_test, mock_interview_score } = data;

    const final_score = Number(attendance_percentage || 0) + Number(machine_test || 0) + Number(mcq_test || 0) + Number(mock_interview_score || 0);
    const weight_score = (attendance_percentage || 0)*0.1 + (machine_test || 0)*0.3 + (mcq_test || 0)*0.3 + (mock_interview_score || 0)*0.3;
    const percentage=(weight_score/10)*100;

    const query = "UPDATE performance SET attendance_percentage = ?, machine_test = ?, mcq_test = ?, mock_interview_score = ?, final_score = ?, percentage = ? WHERE sid = ? ORDER BY created_at DESC LIMIT 1;";
    return conn.query(query, [attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score, percentage, sid]);
};

exports.getConfirmedStudents = async () => {
  const sql = `
    SELECT 
    s.sid, s.name, s.email,
    c.name AS course_name,
    p.attendance_percentage, p.machine_test, p.mcq_test,
    p.mock_interview_score, p.final_score, p.percentage, p.created_at
FROM students s
LEFT JOIN (
    SELECT p1.*
    FROM performance p1
    INNER JOIN (
        SELECT sid, MAX(created_at) AS latest_date
        FROM performance
        GROUP BY sid
    ) p2 
      ON p1.sid = p2.sid AND p1.created_at = p2.latest_date
) p ON s.sid = p.sid
LEFT JOIN courses c ON s.cid = c.cid
ORDER BY s.sid ASC;

    `;
  const [rows] = await conn.query(sql);
  return rows;
};

exports.getAllPerformance = async () => {
  const sql = `
      select
      p.per_id, p.sid, p.attendance_percentage, p.machine_test, 
      p.mcq_test, p.mock_interview_score, p.final_score, p.percentage,p.created_at,
      s.name, s.email,
      c.name as course_name
      from performance p
      join students s ON p.sid = s.sid
      left join courses c ON s.cid = c.cid
      order by p.per_id asc;
  `;
  const [rows] = await conn.query(sql);
  return rows;
};

exports.getLatestPerformance = async (sid) => {
  const [rows] = await conn.query(
    "SELECT * FROM performance WHERE sid = ? ORDER BY per_id DESC LIMIT 1",
    [sid]
  );
  return rows[0];
};

exports.getHistoricalPerformance = async (sid) => {
  const latest = await exports.getLatestPerformance(sid);
  if (!latest) return [];
  const [rows] = await conn.query(
    "SELECT * FROM performance WHERE sid = ? AND per_id <> ? ORDER BY created_at ASC",
    [sid, latest.per_id]
  );
  return rows;
};


exports.getPerformanceByUid = async (uid) => {
  const [rows] = await conn.query(
    `SELECT p.*
     FROM performance p
     JOIN students s ON p.sid = s.sid
     WHERE s.uid = ?
     ORDER BY p.created_at asc`,
    [uid]
  );
  return rows;
};
