
require("dotenv").config();
let mysql=require("mysql2/promise");
let conn=mysql.createPool({
    
    host:process.env.db_host,
    port:process.env.db_port,
    user:process.env.db_username,
    password:process.env.db_password,
    database:process.env.db_dbname,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0


});

module.exports=conn;