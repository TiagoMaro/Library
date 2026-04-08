const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',                          
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book',                          
        required: true
    },
    loan_date: {
        type: Date,
        default: Date.now 
    },
    return_date: {
        type: Date,
        required: true 
    },
    actual_return_date: {
        type: Date 
    },
    status: {
        type: String,
        enum: ['active', 'returned', 'overdue'], 
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Loan', loanSchema, 'loans');