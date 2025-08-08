const conn = require("../../db");

exports.getPerformanceByStudentId = async (sid) => {
    const [rows] = await conn.query("select *from performance where sid = ?", [sid]);
    return rows[0] || null;
};

exports.insertPerformance = async (data) => {
    const { sid, attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score } = data;
    const query = "insert into performance (sid, attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score) values (?, ?, ?, ?, ?, ?)";
    return conn.query(query, [sid, attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score]);
};

exports.updatePerformance = async (data) => {
    const { sid, attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score } = data;
    const query = "update performance set attendance_percentage=?, machine_test=?, mcq_test=?, mock_interview_score=?, final_score=? where sid=?";
    return conn.query(query, [attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score, sid]);
};





