const usermodel = require("../models/userModel.js");
let conn=require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "ABCD#$1234"; 

exports.userController = (req, res) => {
    res.status(200).json({ success: true, message: "User controller active" });
};
exports.registerUser = async (req, res) => {
    const {name,email,contact, password, role } = req.body;
    const encPass = bcrypt.hashSync(password, 8);
    try {
        const result = await usermodel.registerUser(name,email,contact, encPass, role);
        if (result.affectedRows >= 1) {
            res.status(201).json({success: true,message: "Registration successful"});
        } else {
            res.status(400).json({success: false,message: "Registration failed"});
        }
    } catch (err) {
        console.error("Error in registration controller:", err);
        res.status(500).json({success: false,message: "Server error while registering",error: err.message});
    }
};

exports.getUnregisteredUsers = async (req, res) => {
    try {
        const [rows] = await conn.query(
            "select uid, name, email, contact from users where status = false AND role = 'student'"
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getApprovedUsers = async (req, res) => {
  try {
    const [rows] = await conn.query(
      `select u.uid, u.name, u.email, u.contact from users u where u.status = 1 AND u.role = 'student' AND u.uid NOT IN (SELECT s.uid FROM students s)`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const [result] = await conn.query(
      "update users set status = 1 where uid = ? AND role = 'student'",
      [uid]
    );
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Student approved successfully" });
    } else {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};