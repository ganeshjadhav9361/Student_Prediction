let conn = require("../../db.js");

// exports.addStudent = async (name, email, contact, uid, cid) => {
//     try {
//         const [result] = await conn.query(
//             "INSERT INTO students (name, email, contact, uid, cid) VALUES (?, ?, ?, ?, ?)",
//             [name, email, contact, uid, cid]
//         );
//         console.log("Student added successfully:", result);
//         return result;
//     } catch (err) {
//         console.error("Error adding student:", err);
//         throw err;
//     }
// };
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

// exports.deleteStudent = (sid) => {
//     return conn.query("DELETE FROM students WHERE sid = ?", [sid]);
// };
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

exports.addStudent = async (name, email, contact, uid, cid) => {
  const [result] = await conn.query(
    "INSERT INTO students (name, email, contact, uid, cid) VALUES (?, ?, ?, ?, ?)",
    [name, email, contact, uid, cid]
  );
  return result;
};
exports.deleteStudent = async (sid) => {
  try {
    // Step 1: Find the uid linked with this student
    const [rows] = await conn.query("SELECT uid FROM students WHERE sid = ?", [sid]);
    if (rows.length === 0) {
      return { affectedRows: 0 }; // no student found
    }

    const uid = rows[0].uid;

    // Step 2: Delete student from students table
    await conn.query("DELETE FROM students WHERE sid = ?", [sid]);

    // Step 3: Reset user status → unregistered
    await conn.query("UPDATE users SET status = 0 WHERE uid = ?", [uid]);

    return { affectedRows: 1 };
  } catch (err) {
    throw err;
  }
};






