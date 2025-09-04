
const courseModel = require("../models/courseModel");
exports.createCourse = (req, res) => {
  let { name } = req.body;

  courseModel.saveCourse(name)
    .then((result) => {
      if (result && result.affectedRows > 0) {
        res.json({ message: "Course added successfully!" });
      } else {
        console.log("Sending failure JSON response");
        res.status(400).json({ message: "Failed to add course." });
      }
    })
    .catch((err) => {

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
      res.json({ data: result[0] });
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
};

exports.getAllCourses = async (req, res) => {
  try {
    const result = await courseModel.getAllCourses();
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching courses" });
  }
};

exports.UpdateCourse = async (req, res) => {
  const { cid, name } = req.body;
  try {
    const result = await courseModel.UpdateCourse(cid, name);

    if (result.affectedRows > 0) {
      return res.status(200).json({ success: true, message: "Course updated successfully" });

    } else {
      return res.status(404).json({ success: false, error: "No course found with the given ID" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" });
  }

};
exports.deleteCourse = async (req, res) => {
  const cid = req.params.cid;
  try {
    const result = await courseModel.delCourseById(cid)
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Course deleted successfully" });
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message || "Server error" });
  }

};

exports.getCourseById = (req, res) => {
  const cid = req.params.cid;
  let promise = courseModel.getCourseById(cid)
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

