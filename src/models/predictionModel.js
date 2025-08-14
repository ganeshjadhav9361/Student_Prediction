const conn = require("../../db");

exports.getAllPerformanceData = async () => {
    const [rows] = await conn.query(
        "SELECT attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score FROM performance WHERE final_score IS NOT NULL"
    );
    return rows;
};

exports.getPerformanceByStudentId = async (sid) => {
    const [rows] = await conn.query(
        "SELECT attendance_percentage, machine_test, mcq_test, mock_interview_score FROM performance WHERE sid = ?",
        [sid]
    );
    return rows[0] || null;
};
