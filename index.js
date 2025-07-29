require("dotenv").config();
let app=require("./src/app.js");

app.listen(9999,()=>{
    
    console.log("server started");

});

