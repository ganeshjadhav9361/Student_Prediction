let conn = require("../../db.js");

exports.addStudent = async (name, email, contact, uid, cid) => {
    try {
        const [result] = await conn.query(
            "INSERT INTO students (name, email, contact, uid, cid) VALUES (?, ?, ?, ?, ?)",
            [name, email, contact, uid, cid]
        );
        console.log("Student added successfully:", result);
        return result;
    } catch (err) {
        console.error("Error adding student:", err);
        throw err;
    }
};
exports.getAllStudents = () => {
    const sql = `
        SELECT 
            s.sid, s.name, s.email, s.contact, 
            s.uid, 
            c.name AS course_name
        FROM students s
        LEFT JOIN courses c ON s.cid = c.cid
    `;
    return conn.query(sql)
        .then(([rows]) => rows)
        .catch(err => {
            console.error("Error fetching students with course name:", err);
            throw err;
        });
};
exports.updateStudent = (sid, name, email, contact, uid, cid) => {
    return conn.query(
        "UPDATE students SET name=?, email=?, contact=?, uid=?, cid=? WHERE sid=?",
        [name, email, contact, uid, cid, sid]
    );
};
exports.deleteStudent = (sid) => {
    return conn.query("DELETE FROM students WHERE sid = ?", [sid]);
};
exports.getUnregisteredStudents = async () => {
  const sql = `
    SELECT u.*
    FROM users u
    LEFT JOIN students s ON u.uid = s.uid
    WHERE u.role = 'student' AND s.uid IS NULL
  `;
  
  // query() returns [rows, fields] in mysql2/promise
  const [rows] = await conn.query(sql);
  return rows;
};