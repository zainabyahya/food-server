const Comment = require("../models/Comment.js");
const BlogPost = require("../models/BlogPost.js");
const mongoose = require("mongoose");

const getAllComments = async (req, res, next) => {
    try {
        const allComments = await Comment.find();
        res.status(200).json({ allComments });
    } catch (error) {
        next(error);
    }
};

const getCommentsByPost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const foundComments = await Comment.find({ post: postId }).populate("user");
        res.status(200).json({ foundComments });
    } catch (error) {
        next(error);
    }
};

const addComment = async (req, res, next) => {
    try {
        const postId = req.body.post;
        const newCommentData = {
            ...req.body,
            user: req.user.userId,
        };

        const newComment = await Comment.create(newCommentData);
        await BlogPost.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
        res.status(201).json({ newComment });
    } catch (error) {
        next(error);
    }
}
const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const foundComment = await Comment.findByIdAndDelete(commentId);
        await BlogPost.findByIdAndUpdate(foundComment.post, { $pull: { comments: foundComment._id } });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
        res.status(201).json({ updatedComment });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllComments, getCommentsByPost, addComment, deleteComment, updateComment };

