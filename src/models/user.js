const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password_hash: {
        type: String,
        required: true,
        select: false
    },
    birthdate: {
        type: Date,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    },
    addreess: {
        city: String,
        state: String,
        neighborhood: String,
        required: true
    },
    active_loans: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('user', userSchema);