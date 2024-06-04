const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const BlogPost = require("../models/BlogPost")

const verifyAccessToken = async (token) => {
    try {
        const decodedData = jwt.verify(token, process.env.SECRET_KEY);
        return { success: true, data: decodedData };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Please log in to proceed" });
        }

        const result = await verifyAccessToken(token);
        if (!result.success) {
            return res.status(403).json({ error: result.error });
        }
        if (Date.now() * 1000 > result.exp) {
            return res.sendStatus(401);
        }
        req.user = result.data;
        next();
    } catch (error) {
        next(error);
    }
};

const isAuthor = async (req, res, next) => {
    try {
        const blogId = req.params.blogPostId;
        const post = await BlogPost.findById(blogId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        if (post.author.toString() !== req.user.userId.toString()) {
            return res.status(403).send('Forbidden: You are not the author of this post');
        }

        req.post = post;
        next();
    } catch (error) {
        next(error);
    }
};

const authenticateUser = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user._id.toString() !== userId.toString()) {
            return res.status(403).send('Forbidden: You are not the same user');
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { authenticateToken, isAuthor, authenticateUser };