let express = require("express");
let router = express.Router();
let contactCtrl = require("../controllers/contactController.js");

router.post("/contact", contactCtrl.addContact);
router.get("/viewEnquiry", contactCtrl.getAllEnquiry);

module.exports = router;
