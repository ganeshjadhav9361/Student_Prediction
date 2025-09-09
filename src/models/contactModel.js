let conn = require("../../db.js");

async function insertContact(name, email, subject, message) {
  const query = "insert into contact(name, email, subject, message) values (?, ?, ?, ?)";
  const [result] = await conn.query(query, [name, email, subject, message]);
  return result;
}

async function getAllEnquiry() {
  try {
    const [rows] = await conn.query("SELECT * FROM contact ORDER BY id ASC");
    console.log("Query result:", rows);
    return rows;
  } catch (err) {
    console.error("Query Error:", err);
    throw err;
  }
}
module.exports = {
  insertContact ,getAllEnquiry 
};
