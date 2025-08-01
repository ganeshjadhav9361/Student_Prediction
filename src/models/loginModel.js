let conn=require("../../db.js");

async function validateLoginUser(username, password) {
    const query = "select * from users where username = ?";
    const [rows] = await conn.query(query, [username]);

    if (rows.length > 0) {
        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password); 
        return isValid ? user : null;
    }

    return null;
}


module.exports={
    validateLoginUser
};
