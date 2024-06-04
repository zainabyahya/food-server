const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const foodPostSchema = new Schema({
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
    location: { type: [Number], index: { type: '2dsphere', sparse: true } },
    datePosted: {
        type: Date,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

});

const FoodPost = model('FoodPost', foodPostSchema);
module.exports = FoodPost;

