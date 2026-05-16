const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    idDocumentUrl: {
        type: String
    },
    kycStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    isVerifiedSeller: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 5.0,
        min: 0,
        max: 5
    },
    totalSales: {
        type: Number,
        default: 0
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        enum: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Other'],
        default: 'Johannesburg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
