
const courseModel = require("../models/courseModel");
exports.createCourse = (req, res) => {
  let { name } = req.body;

  courseModel.saveCourse(name)
    .then((result) => {
      if (result && result.affectedRows > 0) {
        console.log("Sending success JSON response");
        res.json({ message: "Course added successfully!" });
      } else {
        console.log("Sending failure JSON response");
        res.status(400).json({ message: "Failed to add course." });
      }
    })
    .catch((err) => {
      console.error("Error in saveCourse:", err);
      res.status(500).json({ message: "Failed to add course." });
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

exports.getAllCourses = async (req, res) => {
    console.log("Fetching all courses...");
    try {
        const result = await courseModel.getAllCourses();
        console.log("Courses fetched successfully:", result);
        res.json({ data: result });
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ error: "Server error while fetching courses" });
    }
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
exports.deleteCourse = (req, res) => {
  const cid = req.params.cid;
  courseModel.delCourseById(cid)
    .then(result => {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Course deleted successfully" });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    })
    .catch(err => {
      console.error("Error deleting course:", err);
      res.status(500).json({ error: err.message || "Server error" });
    });
};
// exports.deleteCourse = (req, res) => {
//     let cid = req.body.cid;  

//     let promise = courseModel.delCourseById(cid);
//     promise.then((result) => {
//         if (result.affectedRows > 0) {
//             console.log("Course deleted successfully in backend");
//             res.status(200).json({ message: "Course deleted successfully" });
//         } else {
//             res.status(404).json({ message: "Course not found" });
//         }
//     }).catch((err) => {
//         console.error("Error deleting course:", err);
//         res.status(500).json({ error: err });
//     });
// };

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

