const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    longitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;