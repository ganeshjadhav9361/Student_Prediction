const conn = require("../../db"); 
require("dotenv").config();

async function validateLoginUser(email) {
    const query = "select * from users where email = ?";
    const [rows] = await conn.query(query, [email]);

    if (rows.length > 0) {
        return rows[0]; 
    }

    return null;
}

module.exports = {
    validateLoginUser
};


