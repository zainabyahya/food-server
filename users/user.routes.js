const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, deleteUser, updateUser } = require("../users/user.controllers.js");
const fileUpload = require("../middlewares/fileUpload");
const { authenticateToken, authenticateUser } = require("../middlewares/auth.js");


router.get("/", getAllUsers);

router.get("/:userId", getUserById);

router.delete('/:userId', authenticateToken, authenticateUser, deleteUser);

router.put('/:userId', authenticateToken, authenticateUser, updateUser);

module.exports = router;
