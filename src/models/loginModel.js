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








// let conn=require("../../db.js");

// const bcrypt = require("bcrypt");

// async function validateLoginUser(username, password) {
//     const query = "select * from users where username = ?";
//     const [rows] = await conn.query(query, [username]);


//     if (rows.length > 0) {
//         const user = rows[0];
//         console.log("password:", password);
//         console.log("db password:", user.password);

//         const isValid = await bcrypt.compare(password, user.password); 
//         return isValid ? user : null;
//     }

//     return null;
// }


// module.exports={
//     validateLoginUser
// };




// let conn=require("../../db.js");

// const bcrypt = require("bcrypt");


// async function validateLoginUser(username, password) {
//     const query = "select * from users where username = ?";
//     const [rows] = await conn.query(query, [username]);


//     if (rows.length > 0) {
//         const user = rows[0];
//         console.log("password:", password);
//          console.log("db password:", user.password);

//         const isValid = await bcrypt.compare(password, user.password); 
//         return isValid ? user : null;
//     }

//     return null;
// }


// module.exports={
//     validateLoginUser
// };
