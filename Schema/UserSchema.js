const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your firstname'],
    },
    email: {
        type: String,
        required: [true, 'Enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp : {
        type: Number,
        required : true,
    }
});

module.exports = mongoose.model('User', userSchema);