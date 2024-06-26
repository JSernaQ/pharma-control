const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: false, required: true},
    rol: {
        type: String,
        enum: ['developer', 'admin', 'user'],
        default: 'user'
    },
    isActive: { type: Boolean, default: true, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
