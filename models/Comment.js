const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'BlogPost' },
    commentText: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;