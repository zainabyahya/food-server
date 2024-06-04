const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const addressSchema = new Schema({
    longitude: String,
    latitude: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Address = model('Address', addressSchema);
module.exports = Address;