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
    }
},
    {
        timestamps: true
    });

const bcrypt = require('bcrypt');

//Código para transformar e salvar apenas o hash da senha
userSchema.pre('save', async function (next) {
    //Se não tiver alteração de senha, pula
    if (!this.isModified('password_hash')) return next();

    //Gera o hash da senha que sera armazenado no banco
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
});

module.exports = mongoose.model('User', userSchema, 'customers');