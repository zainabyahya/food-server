const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const foodPostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    dateCreated: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

});

const FoodPost = mongoose.model('FoodPost', foodPostSchema);
module.exports = FoodPost;

