const mongoose = require('mongoose');

//Book create model
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: [String],
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        trim: true
    },
    stock: {
        total: {
            type: Number,
            default: 0,
            min: 0
        },
        available: {
            type: Number,
            default: 0,
            min: 0
        }
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Book', bookSchema, 'books');