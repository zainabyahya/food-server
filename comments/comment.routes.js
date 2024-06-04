const express = require("express");
const router = express.Router();
const { getAllComments, getCommentsByPost, addComment, deleteComment, updateComment } = require("./comment.controllers.js");
const { authenticateToken } = require("../middlewares/auth.js");
const { isCommentAuthor } = require("../middlewares/isAuthor.js");


router.get("/", getAllComments);

router.get("/post/:postId", isCommentAuthor, getCommentsByPost);

router.post("/", authenticateToken, addComment);

router.delete('/:commentId', authenticateToken, isCommentAuthor, deleteComment);

router.put("/:commentId", authenticateToken, isCommentAuthor, updateComment)

module.exports = router;