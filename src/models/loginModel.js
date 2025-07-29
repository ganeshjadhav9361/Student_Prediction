let conn=require("../../db.js");

async function registeruserdata(...regdata) {
    let result=await conn.query("insert into register values('0',?,?,?,?,?)",[...regdata]);
    return result; 
}
async function validateUser(uname){
    let result= await conn.query("select *from register where username=?" ,[uname]);
    return result;
}
async function getLoginUserProfile(loginUserId) {
    let userData= await conn.query("select *from register where rid=?",[loginUserId]);
    return userData;
}
module.exports={registeruserdata,validateUser,getLoginUserProfile};

