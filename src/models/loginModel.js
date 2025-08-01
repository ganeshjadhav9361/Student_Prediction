let conn=require("../../db.js");
let bcrypt = require("bcrypt");

async function validateLoginUser(username, password) {
    const query = "select * from users where username = ?";
    const [rows] = await conn.query(query, [username]);

    if (rows.length > 0) {
         console.log("password:", password);
    console.log("db password:", user.password);
        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password); 
        return isValid ? user : null;
    }

    return null;
}


module.exports={
    validateLoginUser
};
