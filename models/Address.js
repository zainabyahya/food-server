const mongoose = require("mongoose");
const { Schema, model } = mongoose;
var validateNumber = function (number) {
    var re = /^07\d{9}$/;
    return re.test(number);
};


const addressSchema = new Schema({
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
    street: String,
    neighborhood: String,
    phoneNumber: {
        type: String,
        unique: true,
        required: 'رقم الهاتف مطلوب',
        validate: [validateNumber, 'الرجاء ادخال رقم صالح'],
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;