const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const confirmationSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'BlogPost' },
    status: { type: Schema.Types.String, ref: 'Status' },
    confirmedByOwner: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected'
        ],
        default: "pending"

    },
    confirmedByUser: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected'],
        default: "pending"
    },
});


const Confirmation = mongoose.model('Confirmation', confirmationSchema);
module.exports = Confirmation;
