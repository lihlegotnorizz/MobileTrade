const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Register User
exports.register = async (req, res) => {
    try {
        const { fullName, email, phone, password, idNumber } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            fullName,
            email,
            phone,
            password: hashedPassword,
            idNumber,
            kycStatus: 'pending'
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id, user.email);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                kycStatus: user.kycStatus
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user._id, user.email);

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                kycStatus: user.kycStatus,
                isVerifiedSeller: user.isVerifiedSeller,
                rating: user.rating
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get profile', error: error.message });
    }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
    try {
        const { fullName, phone, location } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            { fullName, phone, location },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};

// Get Seller Stats
exports.getSellerStats = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            rating: user.rating,
            totalSales: user.totalSales,
            totalEarnings: user.totalEarnings,
            isVerifiedSeller: user.isVerifiedSeller,
            kycStatus: user.kycStatus
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get stats', error: error.message });
    }
};
