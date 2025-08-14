let conn=require("../../db.js");

let role="user";
async function registerUser(name,email,contact, password, role) {
    const query = "insert into users(name,email,contact, password, role) values (?,?,?, ?, ?)";
    const [result] = await conn.query(query, [name,email,contact, password, role]);

}
module.exports={
    registerUser
};