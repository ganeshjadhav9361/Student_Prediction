let express = require("express");
let router = express.Router();
let userCtrl = require("../controllers/userController.js");

router.get("/user", userCtrl.userController);
router.post("/register", userCtrl.registerUser);

router.put("/approve-user/:uid", userCtrl.approveUser);
router.get("/approved", userCtrl.getApprovedUsers);
router.get("/unregistered", userCtrl.getUnregisteredUsers);

module.exports = router;
