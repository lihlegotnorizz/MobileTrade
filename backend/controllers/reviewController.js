const Review = require('../models/Review');
const User = require('../models/User');

// Create Review
exports.createReview = async (req, res) => {
    try {
        const { revieweeId, transactionId, rating, comment, communicationRating, itemAccuracyRating, shippingRating } = req.body;

        const review = new Review({
            reviewerId: req.userId,
            revieweeId: revieweeId,
            transactionId: transactionId,
            rating: rating,
            comment: comment,
            communicationRating,
            itemAccuracyRating,
            shippingRating
        });

        await review.save();

        // Update user rating
        const allReviews = await Review.find({ revieweeId: revieweeId });
        const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await User.findByIdAndUpdate(revieweeId, { rating: parseFloat(averageRating.toFixed(1)) });

        res.status(201).json({
            message: 'Review created successfully',
            review
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create review', error: error.message });
    }
};

// Get Reviews for User
exports.getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ revieweeId: req.params.userId })
            .populate('reviewerId', 'fullName')
            .sort({ createdAt: -1 });

        const averageRating = reviews.length > 0 
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

        res.json({
            reviews,
            averageRating,
            totalReviews: reviews.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};

// Get Review by ID
exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('reviewerId', 'fullName')
            .populate('revieweeId', 'fullName');

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(review);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch review', error: error.message });
    }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        
        const reviews = await Review.find({ revieweeId: req.userId });
        const averageRating = reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

        res.json({
            user: {
                name: user.fullName,
                email: user.email,
                rating: averageRating,
                totalSales: user.totalSales,
                totalEarnings: user.totalEarnings,
                isVerifiedSeller: user.isVerifiedSeller,
                kycStatus: user.kycStatus
            },
            stats: {
                totalReviews: reviews.length,
                salesCount: user.totalSales,
                earnings: user.totalEarnings
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
    }
};
