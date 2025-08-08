const conn = require("../../db"); 
require("dotenv").config();

async function validateLoginUser(username) {
    const query = "select * from users where username = ?";
    const [rows] = await conn.query(query, [username]);

    if (rows.length > 0) {
        return rows[0]; 
    }

    return null;
}

module.exports = {
    validateLoginUser
};


