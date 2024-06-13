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
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],

});

const BlogPost = mongoose.model('BlogPost', postSchema);
module.exports = BlogPost;

