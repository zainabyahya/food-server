const mongoose = require("mongoose");
const { Schema, model } = mongoose;

var validateNumber = function (number) {
    var re = /^07\d{9}$/;
    return re.test(number);
};

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: {
        type: String,
        unique: true,
        required: 'رقم الهاتف مطلوب',
        validate: [validateNumber, 'الرجاء ادخال رقم صالح'],
    },
    password: {
        type: String,
        trim: true,
        required: 'كلمة السر مطلوبة',
    },
    image: String,
    ratingSum: {
        type: Number,
        default: 0,
    },
    ratingCount: {
        type: Number,
        default: 0,
    },
    bookmark: { type: Schema.Types.ObjectId, ref: 'Bookmark' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;