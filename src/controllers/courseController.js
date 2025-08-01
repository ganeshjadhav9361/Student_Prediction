
const courseModel = require("../models/courseModel");
exports.createCourse = (req, res) => {
    let { name } = req.body;

    let promise = courseModel.saveCourse(name);
    promise.then((result) => {
        if (result && result.affectedRows > 0) {
           //res.send("Course added successfully!");
            res.render("viewcourses.ejs");
        } else {
            //res.send("Failed to add course.");
            res.render("viewcourses.ejs");
        }
    }).catch((err) => {
       //  res.send("Failed to add course.")
       res.render("viewcourses.ejs");
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

exports.getAllCourses = (req, res) => {
    courseModel.getAllCourses()
        .then((result) => {
            console.log("Courses found:", result);
            res.json({ data: result });
        })
        .catch((err) => {
            console.error("Error:", err);
            res.status(500).json({ error: "Server error" });
        });
};
exports.deleteCourse = (req, res) => {
    let cid =req.body.cid;  
    let promise = courseModel.delCourseById(cid);
    promise.then((result) => {
        if (result.affectedRows > 0) {
            //res.json({ message: "Course deleted successfully", result });
            res.status(200).send("Course deleted successfully");

        } 
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};

// exports.updateCourse = (req, res) => {
//     let { id, name } = req.body;
//     let promise = courseModel.UpdateCourse(id, name);
//     promise.then((result) => {
//         let p = courseModel.getAllCourses();
//         p.then((result) => {
//             res.json({ message: "Course updated successfully", data: result });
//         }).catch((err) => {
//             res.status(500).json({ error: "Error fetching updated course list", detail: err });
//         });
//     }).catch((err) => {
//         res.status(500).json({ error: "Course not updated", detail: err });
//     });
// };


exports.updateCourse = (req, res) => {
    let { cid, name } = req.body;
    console.log("Received update request for ID:", cid, "Name:", name);

    let promise = courseModel.UpdateCourse(cid, name);

    promise.then((result) => {
        console.log("Update success, now fetching all courses...");

        let p = courseModel.getAllCourses();

        p.then((result) => {
            console.log("Fetched updated courses.");
            res.json({ message: "Course updated successfully", data: result });
        }).catch((err) => {
            console.error("Error fetching updated courses:", err);
            res.status(500).json({ error: "Error fetching updated course list", detail: err });
        });

    }).catch((err) => {
        console.error("Error updating course:", err);
        res.status(500).json({ error: "Course not updated", detail: err });
    });
};

exports.getCourseById = (req, res) => {
    const cid = req.params.cid;
   let promise=courseModel.getCourseById(cid)
        promise.then((result) => {
            if (result.length === 0) {
                return res.status(404).json({ error: "Course not found" });
            }
            console.log("Course found:", result);
            res.json({ data: result[0] });
        }).catch((err) => {
            console.error("Error:", err);
            res.status(500).json({ error: "Server error" });
        });
};

