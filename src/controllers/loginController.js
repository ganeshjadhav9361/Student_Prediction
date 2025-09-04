const { validateAdmin, validateStudent } = require("../models/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;

exports.validateLoginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === "admin") user = await validateAdmin(email);
    else if (role === "student") user = await validateStudent(email);

    if (!user)
      return res.status(401).json({ success: false, message: "Invalid email or password" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(401).json({ success: false, message: "Invalid email or password" });

    if (role === "student" && user.status !== 1)
      return res.status(403).json({ success: false, message: "Student not confirmed" });

    const payload = { uid: user.uid, role: user.role, username: user.name };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({success: true,message: "Login successful",user: { username: user.name, role: user.role },});
      
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
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