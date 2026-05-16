const mongoose = require('mongoose');

// Review Schema
const reviewSchema = new mongoose.Schema({
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    revieweeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: String,
    communicationRating: Number,
    itemAccuracyRating: Number,
    shippingRating: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);
