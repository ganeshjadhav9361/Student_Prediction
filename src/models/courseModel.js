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

