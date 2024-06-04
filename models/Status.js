const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    status: {
        type: String,
        enum: ["pending", "confirmed", "denied"]
    }
});

module.exports = mongoose.model('Status', statusSchema);
