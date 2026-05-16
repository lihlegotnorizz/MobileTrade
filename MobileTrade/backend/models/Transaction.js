const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phone',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['payfast', 'stripe', 'bank_transfer'],
        required: true
    },
    paymentReference: String,
    deliveryMethod: {
        type: String,
        enum: ['courier', 'collection'],
        required: true
    },
    courierProvider: String,
    trackingNumber: String,
    buyerLocation: String,
    sellerLocation: String,
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: Date
});

module.exports = mongoose.model('Transaction', transactionSchema);
