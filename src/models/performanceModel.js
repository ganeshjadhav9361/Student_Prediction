const conn = require("../../db.js");

exports.getPerformanceByStudentId = async (sid) => {
    const [rows] = await conn.query("select * from performance where sid = ?", [sid]);
    return rows[0] || null;
};

exports.insertPerformance = async (data) => {
    const query = "insert into performance (attendance_percentage, machine_test, mcq_test, mock_interview_score, final_score, sid) values (?, ?, ?, ?, ?, ?)";

    const values = [
        data.attendance_percentage,
        data.machine_test,
        data.mcq_test,
        data.mock_interview_score,
        data.final_score,
        data.sid
    ];

    return conn.query(query, values);
};


exports.updatePerformance = async (data) => {
    const query = "update performance set attendance_percentage = ?, machine_test = ?, mcq_test = ?, mock_interview_score = ?, final_score = ? where sid = ?";

    const values = [
        data.attendance_percentage,
        data.machine_test,
        data.mcq_test,
        data.mock_interview_score,
        data.final_score,
        data.sid
    ];

    return conn.query(query, values);
};

