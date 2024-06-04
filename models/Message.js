const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    chatroom: { type: Schema.Types.ObjectId, ref: 'Chatroom' }

});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;