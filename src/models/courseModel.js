let conn=require("../../db.js");

exports.saveCourse = async (name) => {
  try {
    const [result] = await conn.query("insert into courses values (0, ?)", [name]);
    return result;
  } catch (err) {
    throw err;
  }
};
exports.getAllCourses = async () => {
    try {
        const [rows] = await conn.query("select * from courses order by cid ASC");
        return rows;
    } catch (err) {
        throw err;
    }
};

exports.delCourseById = async(cid) => {
    const [result] = await conn.query("delete from courses where cid = ?", [cid]);
    return result;
};
exports.getCourseById = (cid) => {
    return new Promise((resolve, reject) => {
        conn.query("select * from courses where id = ?", [cid], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.UpdateCourse = async (cid, name1) => {
    const [result] = await conn.query("update courses set name = ? where cid = ?", [name1, cid]);
    return result;
};



