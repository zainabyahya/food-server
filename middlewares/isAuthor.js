const BlogPost = require("../models/BlogPost");
const Comment = require("../models/Comment");
const Message = require("../models/Message");


const isPostAuthor = async (req, res, next) => {
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

const isCommentAuthor = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        if (comment.user.toString() !== req.user.userId.toString()) {
            return res.status(403).send('Forbidden: You are not the author of this comment');
        }

        next();
    } catch (error) {
        next(error);
    }
};


const isMessageAuthor = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }

        if (message.user.toString() !== req.user.userId.toString()) {
            return res.status(403).send('Forbidden: You are not the author of this message');
        }

        next();
    } catch (error) {
        next(error);
    }
};
module.exports = { isPostAuthor, isCommentAuthor, isMessageAuthor };
