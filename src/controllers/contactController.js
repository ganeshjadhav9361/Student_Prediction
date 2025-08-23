const contactModel = require("../models/contactModel.js");

exports.addContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const result = await contactModel.insertContact(name, email, subject, message);

    if (result.affectedRows >= 1) {
      res.status(201).json({ success: true, message: "Message Send successfully" });
    } else {
      res.status(400).json({ success: false, message: "Failed to save contact" });
    }
  } catch (err) {
    console.error("Error in contact controller:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: "Server error while saving contact", error: err.message });
  }
};
