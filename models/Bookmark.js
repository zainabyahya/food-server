const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    posts: [{ type: Schema.Types.ObjectId, ref: 'BlogPost' }]
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
module.exports = Bookmark;
