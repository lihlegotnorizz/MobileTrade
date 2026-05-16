const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authMiddleware } = require('../middleware/auth');

// Protected routes
router.post('/calculate-trade-value', authMiddleware, transactionController.calculateTradeValue);
router.post('/initiate', authMiddleware, transactionController.initiateTransaction);
router.get('/', authMiddleware, transactionController.getUserTransactions);
router.put('/:id/status', authMiddleware, transactionController.updateTransactionStatus);

module.exports = router;
