let express = require("express");
let conn = require("../db.js");

// const router = require("./routes/routes.js");
const userRouter=require("./routes/userRouter.js");
const cookieParser = require("cookie-parser");
const loginRouter = require("./routes/loginRouter.js"); 

let path = require("path");
let bodyParser = require("body-parser");

let app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.set("views", path.join(__dirname,"..", "views"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/",userRouter);
app.use("/",loginRouter);

module.exports = app;
