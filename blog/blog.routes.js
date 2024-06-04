const express = require("express");
const router = express.Router();
const { getAllBlogPosts, getBlogPostById, getBlogPostByAuthor, addBlogPost, deleteBlogPost, updateBlogPost } = require("./blog.controllers.js");
const { authenticateToken } = require("../middlewares/auth.js");
const { isPostAuthor } = require("../middlewares/isAuthor.js");

const { fileUpload } = require("../middlewares/fileUpload");

router.get("/", getAllBlogPosts);

router.get("/:blogPostId", getBlogPostById);

router.get("/author/:authorId", getBlogPostByAuthor);

router.post("/", authenticateToken, fileUpload.single("image"), addBlogPost);

router.delete('/:blogPostId', authenticateToken, isPostAuthor, deleteBlogPost);

router.put('/:blogPostId', authenticateToken, isPostAuthor, fileUpload.single("image"), updateBlogPost);

module.exports = router;