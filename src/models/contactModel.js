let conn = require("../../db.js");

async function insertContact(name, email, subject, message) {
  const query = "insert into contact(name, email, subject, message) values (?, ?, ?, ?)";
  const [result] = await conn.query(query, [name, email, subject, message]);
  return result;
}

module.exports = {
  insertContact
};
