const mongoose = require("mongoose");
const { Schema, model } = mongoose;

var validateNumber = function (number) {
    var re = /^07\d{9}$/;
    return re.test(number);
};


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
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
        minlength: 8,
    },
    image: String,
    bookmark: { type: Schema.Types.ObjectId, ref: 'Bookmark' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;