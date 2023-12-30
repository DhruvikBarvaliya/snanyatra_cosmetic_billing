const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

router.post("/user",  UserController.addUser);
router.get("/user",  UserController.getAllUser);
router.get("/user/:user_id", UserController.getUserById);
router.put("/user/:user_id", UserController.updateUser);
router.put("/user/:user_id/:status", UserController.updateUserStatus);
router.delete("/user/:user_id", UserController.deleteUser);

module.exports = router;
