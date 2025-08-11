let conn=require("../../db.js");

exports.saveCourse = async (name) => {
  try {
    const [result] = await conn.query("INSERT INTO courses VALUES (0, ?)", [name]);
    console.log("Course saved:", result);
    return result;
  } catch (err) {
    console.error("Course not saved:", err);
    throw err;
  }
};
exports.getAllCourses = async () => {
    console.log("model.....");
    try {
        const [rows] = await conn.query("SELECT * FROM courses ORDER BY cid ASC");
        console.log("Courses fetched:", rows);
        return rows;
    } catch (err) {
        console.error("Error fetching courses:", err);
        throw err;
    }
};
// exports.delCourseById = (cid) => {
//     return new Promise((resolve, reject) => {
        
//         conn.query("DELETE FROM courses WHERE cid = ?", [cid], (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// };
exports.delCourseById = (cid) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM courses WHERE cid = ?", [cid], (err, result) => {
      if (err) return reject(err);
      resolve(result); // result.affectedRows will be checked in controller
    });
  });
};
exports.getCourseById = (cid) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM courses WHERE id = ?", [cid], (err, result) => {
            if (err) {
                reject(err);
            } else {
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
// exports.deleteCourse = (cid) => {
//     return new Promise((resolve, reject) => {
//         console.log("delete model hit");
//         conn.query("DELETE FROM courses WHERE cid = ?", [cid], (err, result) => {
//             if (err) {
//                 console.log("Error deleting course:", err);
//                 reject(err);
//             } else {
//                 console.log("Course deleted successfully:", result);
//                 resolve(result);
//             }
//         });
//     });
// };



