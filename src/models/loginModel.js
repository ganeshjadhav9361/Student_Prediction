const conn = require("../../db");

async function validateAdmin(email) {
  const query = "select *from users where email = ? and role='admin' LIMIT 1";
  const [rows] = await conn.query(query, [email]);
  return rows[0] || null;
}

async function validateStudent(email) {
  const query = "select u.*, s.sid from users u join students s on u.uid = s.uid where u.email = ? and u.role='student' LIMIT 1";
  const [rows] = await conn.query(query, [email]);
  return rows[0] || null;
}


module.exports = { validateAdmin, validateStudent };
