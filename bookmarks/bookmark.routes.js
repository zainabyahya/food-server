const express = require("express");
const router = express.Router();
const { getAllBookmarks, handleBookmark, getBookmarksByUser } = require("./bookmark.controllers.js");
const { authenticateToken } = require("../middlewares/auth.js");

router.get("/", getAllBookmarks);

router.get("/:userId", authenticateToken, getBookmarksByUser);

router.post("/", authenticateToken, handleBookmark);


module.exports = router;