let express = require("express");
let router = express.Router();
let contactCtrl = require("../controllers/contactController.js");

router.post("/contact", contactCtrl.addContact);

module.exports = router;
