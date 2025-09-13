const { validateAdmin, validateStudent,findUnconfirmedStudent,findUserByEmail,fetchStudentLoginInfo } = require("../models/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;

exports.getAdminDashboard = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, secretKey);
    res.json({ name: decoded.username, role: decoded.role });

  } catch (err) {
    console.error("Error in getAdminDashboard:", err);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
exports.validateLoginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === "admin") {
      user = await validateAdmin(email);
      if (!user) return res.status(404).json({ success: false, message: " You are not authorized to access the Admin panel. Contact the system administrator if you need admin access." });
    }

    if (role === "student") {
      // 1️⃣ Fetch password from user
      user = await findUserByEmail(email);
      if (!user) return res.status(404).json({ success: false, message: "Don't have account? Register before login" });

      // 2️⃣ Check password
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) return res.status(401).json({ success: false, message: "Invalid email or password" });

      // 3️⃣ Check unapproved
      const unapproved = await findUnconfirmedStudent(email);
      if (unapproved) return res.status(403).json({ success: false, message: "Not confirmed by admin, please wait for admin approval" });

      // 4️⃣ Attach sid
      const studentJoined = await validateStudent(email);
      if (studentJoined) user.sid = studentJoined.sid;
    }

    // 5️⃣ Create JWT
    const payload = { uid: user.uid, role: user.role, username: user.name, sid: user.sid };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: false, maxAge: 3600000, path: "/" });

    return res.status(200).json({ success: true, message: "Login successful", user: { username: user.name, role: user.role } });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
