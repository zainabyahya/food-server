const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Message = model('FoodPost', messageSchema);
module.exports = Message;