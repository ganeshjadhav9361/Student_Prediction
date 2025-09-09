let conn = require("../../db.js");

exports.getAllStudents = () => {
    const sql = `
        SELECT 
            s.sid, s.name, s.email, s.contact, 
            s.uid, 
            c.name as course_name
        from students s
        left join courses c on s.cid = c.cid
    `;
    return conn.query(sql)
        .then(([rows]) => rows)
        .catch(err => {
            throw err;
        });
};
// exports.updateStudent = (sid, name, email, contact, uid, cid) => {
//     return conn.query(
//         "update students set name=?, email=?, contact=?, uid=?, cid=? where sid=?",
//         [name, email, contact, uid, cid, sid]
//     );
// };

exports.getUnregisteredStudents = async () => {
  const sql = `
    select u.*
    from users u
    left join students s on u.uid = s.uid
    where u.role = 'student' and s.uid is null
  `;
  const [rows] = await conn.query(sql);
  return rows;
};

exports.addStudent = async (name, email, contact, uid, cid) => {
  const [result] = await conn.query(
    "insert into students (name, email, contact, uid, cid) values (?, ?, ?, ?, ?)",
    [name, email, contact, uid, cid]
  );
  return result;
};
exports.deleteStudent = async (sid) => {
  try {
    const [rows] = await conn.query("select uid from students where sid = ?", [sid]);
    if (rows.length === 0) {
      return { affectedRows: 0 };
    }

    const uid = rows[0].uid;
    await conn.query("DELETE FROM students WHERE sid = ?", [sid]);
    await conn.query("UPDATE users SET status = 0 WHERE uid = ?", [uid]);
    return { affectedRows: 1 };
  } catch (err) {
    throw err;
  }
};



// exports.updateStudent = async (req, res) => {
//   try {
//     let { sid, name, email, contact, uid, cid } = req.body;

//     // If cid not provided, keep old one
//     if (!cid) {
//       const [rows] = await conn.query("SELECT cid FROM students WHERE sid=?", [sid]);
//       if (rows.length > 0) {
//         cid = rows[0].cid; // use old course id
//       }
//     }

//     const [result] = await conn.query(
//       `UPDATE students SET name=?, email=?, contact=?, uid=?, cid=? WHERE sid=?`,
//       [name, email, contact, uid, cid, sid]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json({ message: "Student updated successfully" });
//   } catch (error) {
//     console.error("Update student error:", error);
//     res.status(500).json({ message: "Failed to update student" });
//   }
// };



exports.updateStudent = async (sid, name, email, contact, uid, cid) => {
  // If cid not provided, keep old one
  if (!cid) {
    const [rows] = await conn.query("SELECT cid FROM students WHERE sid=?", [sid]);
    if (rows.length > 0) {
      cid = rows[0].cid; // use old course id
    }
  }

  const [result] = await conn.query(
    `UPDATE students 
     SET name=?, email=?, contact=?, uid=?, cid=? 
     WHERE sid=?`,
    [name, email, contact, uid, cid, sid]
  );

  return result;
};
// exports.updateStudent = async(sid, name, email, contact, uid, cid) => {
//     const [result]=await conn.query(
//         "update students set name=?, email=?, contact=?, uid=?, cid=? where sid=?",
//         [name, email, contact, uid, cid, sid]);
//         return result;
// };
exports.getStudentById = async (sid) => {
    const query = `
        SELECT s.sid, s.name, s.email, s.contact, s.uid, s.cid, c.name AS course_name
        FROM students s
        LEFT JOIN courses c ON s.cid = c.cid
        WHERE s.sid = ?`;
        
    const [rows] = await conn.query(query, [sid]);
    return rows[0] || null;
};

exports.getStudentProfile = async (uid) => {
  const query = "SELECT name, email, contact FROM students WHERE uid = ?";
  const [rows] = await conn.query(query, [uid]);
  return rows;
};


exports.getStudentCourses = async (uid) => {
  const query = `
    SELECT c.cid, c.name AS course
    FROM students s
    JOIN courses c ON s.cid = c.cid
    WHERE s.uid = ?
  `;
  const [rows] = await conn.query(query, [uid]);
  return rows;
};

// exports.UpdateCourse = async (cid, name1) => {
//     const [result] = await conn.query("update courses set name = ? where cid = ?", [name1, cid]);
//     return result;
// };
