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
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    dateCreated: {
        type: Date,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

});

const FoodPost = mongoose.model('FoodPost', foodPostSchema);
module.exports = FoodPost;

