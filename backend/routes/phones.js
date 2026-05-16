const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phoneController');
const { authMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', phoneController.getAllListings);
router.get('/:id', phoneController.getListing);

// Protected routes
router.post('/', authMiddleware, phoneController.createListing);
router.put('/:id', authMiddleware, phoneController.updateListing);
router.delete('/:id', authMiddleware, phoneController.deleteListing);
router.get('/seller/my-listings', authMiddleware, phoneController.getSellerListings);

module.exports = router;
