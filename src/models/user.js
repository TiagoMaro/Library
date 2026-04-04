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
        neighborhood: String
    },
    active_loans: {
        type: Number,
        default: 0
    },
    is_admin: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

const bcrypt = require('bcrypt');

//Save only the hash of password
userSchema.pre('save', async function (next) {
    //If the password is not modified, continue
    if (!this.isModified('password_hash')) return next();

    //Generate a hash of password
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
});

module.exports = mongoose.model('User', userSchema, 'customers');