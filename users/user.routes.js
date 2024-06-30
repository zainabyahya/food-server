const express = require("express");
const router = express.Router();
const { getUserById, deleteUser, updateUser, updateUserRating } = require("../users/user.controllers.js");
const { fileUpload } = require("../middlewares/fileUpload");
const { authenticateToken, authenticateUser } = require("../middlewares/auth.js");



router.get("/:userId", getUserById);

router.delete('/:userId', authenticateToken, authenticateUser, deleteUser);

router.put('/:userId', authenticateToken, authenticateUser, fileUpload.single("image"), updateUser);

router.put('/rating/:userId', updateUserRating);

module.exports = router;
