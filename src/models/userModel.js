let conn=require("../../db.js");
async function registerUser(username, password, role) {
    const query = "insert into users(username, password, role) values (?, ?, ?)";
    const [result] = await conn.query(query, [username, password, role]);
    return result;
}

module.exports={
    registerUser
};



