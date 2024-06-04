const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const confirmationSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'BlogPost' },
    status: { type: Schema.Types.ObjectId, ref: 'Status', default: "pending" },
    confirmedByOwner: { type: Boolean, default: false },
    confirmedByUser: { type: Boolean, default: false },
});


const Confirmation = mongoose.model('Confirmation', confirmationSchema);
module.exports = Confirmation;
