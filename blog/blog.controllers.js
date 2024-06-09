const BlogPost = require("../models/BlogPost");
const Bookmark = require("../models/Bookmark");
const path = require("path");
const fs = require("fs");
const getFirebaseImgUrl = require("../services/firebaseStorageService");

const getAllBlogPosts = async (req, res, next) => {
    try {
        const allBlogPosts = await BlogPost.find().populate('author');
        res.status(200).json({ allBlogPosts });
    } catch (error) {
        next(error);
    }
};

const getBlogPostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const foundBlogPost = await BlogPost.findById(postId).populate('author');
        res.status(200).json({ foundBlogPost });
    } catch (error) {
        next(error);
    }
};

const getBlogPostByAuthor = async (req, res, next) => {
    try {
        const { authorId } = req.params;
        const foundBlogPosts = await BlogPost.find({ author: authorId });
        res.status(200).json({ foundBlogPosts });
    } catch (error) {
        next(error);
    }
};

const addBlogPost = async (req, res, next) => {
    try {
        const newBlogPostData = {
            ...req.body,
            author: req.user.userId,
            dateCreated: Date.now(),
        };

        if (req.file) {
            const imageURL = await getFirebaseImgUrl(
                "blog-images",
                req.file.path,
                req.file.originalname
            );
            console.log("imageURL" + imageURL);

            newBlogPostData.image = imageURL;
        }

        const newBlogPost = await BlogPost.create(newBlogPostData);

        res.status(201).json({ newBlogPost });
    } catch (error) {
        next(error);
    }
};

const deleteBlogPost = async (req, res, next) => {
    try {
        const postId = req.params.blogPostId;
        const foundPost = await BlogPost.findByIdAndDelete(postId);

        if (foundPost.image) {
            const imageName = foundPost.image.replace(/^images\//, "");
            const staticPath = path.join(path.dirname(""), "static/images");
            const imagePath = path.join(staticPath, imageName);

            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        return res.status(500).json({ error: "Error deleting post image" });
                    }
                });
            }
        }
        await Bookmark.updateMany(
            { posts: postId },
            { $pull: { posts: postId } }
        );

        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

const updateBlogPost = async (req, res, next) => {

    try {
        console.log(req.body);
        let newPostData = { ...req.body };
        const postId = req.params.blogPostId;

        if (req.file) {
            const imageURL = await getFirebaseImgUrl(
                "blog-images",
                req.file.path,
                req.file.originalname
            );
            console.log("imageURL" + imageURL);

            newPostData.image = imageURL;
        }

        console.log("🚀 ~ updateBlogPost ~ newPostData:", newPostData)

        const updatedBlogPost = await BlogPost.findByIdAndUpdate(postId, newPostData, { new: true });
        res.status(201).json({ updatedBlogPost });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllBlogPosts, getBlogPostById, getBlogPostByAuthor, addBlogPost, deleteBlogPost, updateBlogPost };