let express = require("express");
const cors = require("cors");
let conn = require("../db.js");
require("dotenv").config();

const courseRouter = require("./routes/courseRouter.js");
const userRouter=require("./routes/userRouter.js");
const cookieParser = require("cookie-parser");
const loginRouter = require("./routes/loginRouter.js"); 
const studentRouter = require("./routes/studentRouter");
const performanceRouter = require("./routes/performanceRouter.js");
const predictionRouter =require("./routes/predictionRouter.js")

let path = require("path");
let bodyParser = require("body-parser");

let app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.set("views", path.join(__dirname,"..", "views"));

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/",courseRouter);
app.use("/",userRouter);
app.use("/",loginRouter);
app.use("/",studentRouter);
app.use("/",performanceRouter);
app.use("/",predictionRouter);
app.get('/test', (req, res) => {
  res.send('Hello world!');
});


module.exports = app;
