const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/auth');

// Public routes
router.get('/user/:userId', reviewController.getUserReviews);
router.get('/:id', reviewController.getReview);

// Protected routes
router.post('/', authMiddleware, reviewController.createReview);
router.get('/dashboard/stats', authMiddleware, reviewController.getDashboardStats);

module.exports = router;
