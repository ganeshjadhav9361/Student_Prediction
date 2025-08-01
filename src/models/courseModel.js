let conn=require("../../db.js");

exports.saveCourse = (name) => {
    return new Promise((resolve, reject) => {
        conn.query("INSERT INTO courses VALUES (0, ?)", [name], (err, result) => {
            if (err) {
                console.log("Course not saved.");
                reject(err);
            } else {
                console.log("Course saved:", result);
                resolve(result);
            }
        });
    });
};
exports.getCourseById = (cid) => {
    console.log("Fetching course by ID...");
    return new Promise((resolve, reject) => {
        conn.query("select * from courses where cid = ?", [cid], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};
exports.UpdateCourse = (cid, name) => {
    console.log("UpdateCourse model hit");
    return new Promise((resolve, reject) => {
        conn.query("UPDATE courses SET name = ? WHERE cid = ?", [name, cid], (err, result) => {
            if (err) {
                console.log("Update failed:", err);
                reject(err);
            } else {
                console.log("Update result:", result);
                resolve(result);
            }
        });
    });
};
exports.getAllCourses = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM courses", (err, result) => {
            if (err) {
                console.log("Error fetching courses:", err);
                reject(err);
            } else {
                console.log("Courses fetched successfully:", result);
                resolve(result);
            }
        });
    });
};
exports.deleteCourse = (cid) => {
    return new Promise((resolve, reject) => {
        console.log("delete model hit");
        conn.query("DELETE FROM courses WHERE cid = ?", [cid], (err, result) => {
            if (err) {
                console.log("Error deleting course:", err);
                reject(err);
            } else {
                console.log("Course deleted successfully:", result);
                resolve(result);
            }
        });
    });
};

