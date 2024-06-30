const Bookmark = require("../models/Bookmark.js");


const getAllBookmarks = async (req, res, next) => {
    try {
        const allBookmarks = await Bookmark.find().populate("posts");
        res.status(200).json({ allBookmarks });
    } catch (error) {
        next(error);
    }
};

const getBookmarksByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const userBookmarks = await Bookmark.findOne({ user: userId }).populate('posts').populate({
            path: 'posts',
            populate: {
                path: 'author',
                model: 'User'
            }
        });;
        res.status(200).json({ userBookmarks });
    } catch (error) {
        next(error);
    }
};

const handleBookmark = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const postId = req.body.postId.postId;

        let bookmark = await Bookmark.findOne({ user: userId });

        if (bookmark) {
            if (!bookmark.posts.includes(postId)) {
                bookmark.posts.push(postId);
                bookmark.save();
            } else {
                bookmark.posts.pull(postId);
                bookmark.save();
            }
        } else {
            bookmark = new Bookmark({ user: userId, posts: [postId] });
            await bookmark.save();
        }

        res.status(201).json({ bookmark });
    } catch (error) {
        next(error);
    }
};


module.exports = { getAllBookmarks, handleBookmark, getBookmarksByUser };