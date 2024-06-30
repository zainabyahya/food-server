const express = require('express');
const router = express.Router();
const { getAllFoodPosts, getFoodPostById, getFoodPostByOwner, updateFoodPost, deleteFoodPost, addFoodPost } = require('./food.controllers');
const { authenticateToken } = require("../middlewares/auth.js");
const { fileUpload } = require("../middlewares/fileUpload.js")
const { isFoodAuthor } = require("../middlewares/isAuthor.js");

router.post('/', authenticateToken, fileUpload.single("image"), addFoodPost);

router.put('/update/:foodPostId', authenticateToken, isFoodAuthor, updateFoodPost);

router.delete('/:foodPostId', authenticateToken, isFoodAuthor, deleteFoodPost);

router.get('/', getAllFoodPosts);

router.get('/:foodPostId', getFoodPostById);

router.get('/owner/:ownerId', fileUpload.single("image"), getFoodPostByOwner);

module.exports = router;
