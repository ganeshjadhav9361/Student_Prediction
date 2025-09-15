let conn = require("../../db.js");

exports.getAllStudents = () => {
    const sql = `select s.sid, s.name, s.email, s.contact, s.uid, c.name as course_name
                 from students s left join courses c on s.cid = c.cid`;
           return conn.query(sql)
          .then(([rows]) => rows)
          .catch(err => {
            throw err;
        });
};

exports.getUnregisteredStudents = async () => {
  const sql = `select u.*from users u left join students s on u.uid = s.uid where u.role = 'student' and s.uid is null`;
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

exports.updateStudent = async (sid, name, email, contact, uid, cid) => {
  if (!cid) {
    const [rows] = await conn.query("select cid from students where sid=?", [sid]);
    if (rows.length > 0) {
      cid = rows[0].cid; 
    }
  }
  const [result] = await conn.query(
    `update students set name=?, email=?, contact=?, uid=?, cid=?  where sid=?`,[name, email, contact, uid, cid, sid]);
  return result;
};
exports.getStudentById = async (sid) => {
    const query = `select s.sid, s.name, s.email, s.contact, s.uid, s.cid, c.name AS course_name
        from students s left join courses c ON s.cid = c.cid where s.sid = ?`;
    const [rows] = await conn.query(query, [sid]);
    return rows[0] || null;
};

exports.getStudentProfile = async (uid) => {
  const query = "select name, email, contact from students where uid = ?";
  const [rows] = await conn.query(query, [uid]);
  return rows;
};

exports.getStudentCourses = async (uid) => {
  const query = `select c.cid, c.name AS course from students s join courses c ON s.cid = c.cid where s.uid = ?`;
  const [rows] = await conn.query(query, [uid]);
  return rows;
};