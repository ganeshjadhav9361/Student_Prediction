const conn = require("../../db");

exports.getPerformanceByStudentId = async (sid) => {
    const [rows] = await conn.query("select * from performance where sid = ?", [sid]);
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

    const query = "update performance set attendance_percentage = ?, machine_test = ?, mcq_test = ?, mock_interview_score = ?, final_score = ?, percentage = ? where sid = ?";
    return conn.query(query, [attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score, percentage, sid]);
};

exports.getConfirmedStudents = async () => {
  const sql = `
    select 
    s.sid, s.name, s.email, s.contact, s.uid,
    c.name as course_name,
    p.attendance_percentage, p.machine_test, p.mcq_test, p.mock_interview_score, p.final_score, p.percentage
    from students s
    left join performance p ON s.sid = p.sid
    left join courses c ON s.cid = c.cid
    order by s.sid asc;
    `;
  const [rows] = await conn.query(sql);
  return rows;
};

exports.getAllPerformance = async () => {
  const sql = `
      select
      p.per_id, p.sid, p.attendance_percentage, p.machine_test, 
      p.mcq_test, p.mock_interview_score, p.final_score, p.percentage,
      s.name, s.email, s.contact,
      c.name as course_name
      from performance p
      join students s ON p.sid = s.sid
      left join courses c ON s.cid = c.cid
      order by p.sid asc;
  `;
  const [rows] = await conn.query(sql);
  return rows;
};

