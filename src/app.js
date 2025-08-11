let express = require("express");
let conn = require("../db.js");
require("dotenv").config();
const cors = require("cors");
const courseRouter = require("./routes/courseRouter.js");
const userRouter=require("./routes/userRouter.js");
const cookieParser = require("cookie-parser");
const loginRouter = require("./routes/loginRouter.js"); 
const studentRouter = require("./routes/studentRouter");
const performanceRouter = require("./routes/performanceRouter.js");


let path = require("path");
let bodyParser = require("body-parser");

let app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.set("views", path.join(__dirname,"..", "views"));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/",courseRouter);
app.use("/",userRouter);
app.use("/",loginRouter);
app.use("/",studentRouter);
app.use("/",performanceRouter);
app.get('/test', (req, res) => {
  res.send('Hello world!');
});


module.exports = app;
