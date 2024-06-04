const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    status: {
        type: String,
        enum: ["pending", "confirmed", "denied"]
    }
});


const Status = mongoose.model('Status', statusSchema);
module.exports = Status;
