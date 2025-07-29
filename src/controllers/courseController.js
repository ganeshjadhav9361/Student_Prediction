
const courseModel = require("../models/courseModel");
exports.createCourse = (req, res) => {
    let { name } = req.body;

    let promise = courseModel.saveCourse(name);
    promise.then((result) => {
        if (result && result.affectedRows > 0) {
           // res.render("addCourse.ejs", { msg: "Course added successfully!" });
           res.send("Course added successfully!");
        } else {
            //res.render("addCourse.ejs", { msg: "Failed to add course." });
            res.send("Failed to add course.");
        }
    }).catch((err) => {
        //res.render("addCourse.ejs", { msg: err.sqlMessage || "Something went wrong." });
         res.send("Failed to add course.")
    });
};


