
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
exports.getCourseById = (req, res) => {
    const cid = req.params.id;

    courseModel.getCourseById(cid)
        .then((result) => {
            if (result.length === 0) {
                return res.status(404).json({ error: "Course not found" });
            }
            console.log("Course found:", result);
            res.json({ data: result[0] });
        })
        .catch((err) => {
            console.error("Error:", err);
            res.status(500).json({ error: "Server error" });
        });
};
exports.getAllCourses = (req, res) => {
    console.log("Fetching all courses...");
    courseModel.getAllCourses()
        .then((result) => {
            console.log("Courses fetched successfully:", result);
            res.json({ data: result });
        })
        .catch((err) => {
            console.error("Error fetching courses:", err);
            res.status(500).json({ error: "Server error" });
        });
};
exports.deleteCourse = (req, res) => {
    const cid = req.body.cid;
console.log("delete controller hit");
    courseModel.deleteCourse(cid)
        .then((result) => {
            if (result.affectedRows > 0) {
                console.log("Course deleted successfully");
                res.json({ message: "Course deleted successfully" });
            } else {
                console.log("No course found with the given ID");
                res.status(404).json({ error: "No course found with the given ID" });
            }
        })
        .catch((err) => {
            console.error("Error deleting course:", err);
            res.status(500).json({ error: "Server error" });
        });
};
exports.UpdateCourse = (req, res) => {
    const { cid, name } = req.body;  // ✅ FIXED HERE

    courseModel.UpdateCourse(cid, name)
        .then((result) => {
            if (result.affectedRows > 0) {
                console.log("update controller hit");
                res.json({ message: "Course updated successfully" });
            } else {
                console.log("No course found with the given ID");
                res.status(404).json({ error: "No course found with the given ID" });
            }
        })
        .catch((err) => {
            console.error("Error updating course:", err);
            res.status(500).json({ error: "Server error" });
        });
};


