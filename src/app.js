let express = require("express");
let conn = require("../db.js");
let path = require("path");
let bodyParser = require("body-parser");
let app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"..", "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;
