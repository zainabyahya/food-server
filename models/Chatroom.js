const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatroomSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);
module.exports = Chatroom;