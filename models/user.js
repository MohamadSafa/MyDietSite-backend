const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, required: true, default: 'customer', enum : ["admin" , "customer"]},
    phoneNumber: { type: String, required: true, unique: true},
});

const User = mongoose.model('users', userSchema);

module.exports = User;