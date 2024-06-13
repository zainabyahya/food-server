const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
});

const Location = model('Location', locationSchema);
module.exports = Location;