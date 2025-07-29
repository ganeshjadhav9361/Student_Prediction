let express = require("express");
let conn = require("../db.js");

const router = require("./routes/routes.js");

const cookieParser = require("cookie-parser");

let path = require("path");
let bodyParser = require("body-parser");
let routes = require("./routes/routes.js");
let app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname,"..", "views"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router); 

app.use(cookieParser());

app.use("/", routes);


module.exports = app;
