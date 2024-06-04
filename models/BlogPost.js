const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    image: String,
    dateCreated: {
        type: Date,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likeCount: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],



});

const BlogPost = model('BlogPost', postSchema);
module.exports = BlogPost;

