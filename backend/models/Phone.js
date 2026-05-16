const mongoose = require('mongoose');

// Phone Listing Schema
const phoneSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    brand: {
        type: String,
        required: true,
        enum: ['iPhone', 'Samsung', 'Huawei', 'Xiaomi', 'OnePlus', 'Google', 'Other']
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    color: String,
    condition: {
        type: String,
        required: true,
        enum: ['excellent', 'good', 'fair', 'poor']
    },
    description: String,
    photos: [String], // URLs to photos
    location: {
        type: String,
        enum: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Other'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'sold', 'removed'],
        default: 'active'
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Phone', phoneSchema);
