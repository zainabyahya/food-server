const mongoose = require("mongoose");
const { Schema, model } = mongoose;
var validateNumber = function (number) {
    var re = /^07\d{9}$/;
    return re.test(number);
};

const addressSchema = new Schema({
    location: { type: Schema.Types.String, ref: 'Location' },
    street: String,
    neighborhood: String,
    phoneNumber: {
        type: String,
        unique: true,
        validate: [validateNumber, "الرجاء ادخال الرقم بشكل صحيح"],
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;