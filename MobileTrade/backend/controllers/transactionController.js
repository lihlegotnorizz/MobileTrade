const Transaction = require('../models/Transaction');
const Phone = require('../models/Phone');
const User = require('../models/User');

// Calculate Trade-In Value
exports.calculateTradeValue = async (req, res) => {
    try {
        const { oldBrand, oldModel, condition, newPhoneId } = req.body;

        // Mock trade values database (in production, use a proper database)
        const tradeValues = {
            'iPhone': { 'iPhone 12': 8000, 'iPhone 13': 9500, 'iPhone 11': 6500 },
            'Samsung': { 'Galaxy S21': 8500, 'Galaxy S20': 7000, 'Galaxy A52': 4500 },
            'Xiaomi': { 'Mi 11': 5000, 'Mi 10': 4000 }
        };

        let tradeValue = tradeValues[oldBrand]?.[oldModel] || 5000;

        // Apply condition multiplier
        const conditionMultiplier = {
            'excellent': 1.0,
            'good': 0.85,
            'fair': 0.65,
            'poor': 0.4
        };

        tradeValue = Math.round(tradeValue * (conditionMultiplier[condition] || 0.85));

        // Get new phone price
        const newPhone = await Phone.findById(newPhoneId);
        if (!newPhone) {
            return res.status(404).json({ message: 'New phone not found' });
        }

        const topupAmount = Math.max(0, newPhone.price - tradeValue);

        res.json({
            oldPhoneValue: tradeValue,
            newPhonePrice: newPhone.price,
            topupAmount: topupAmount,
            savings: newPhone.price - topupAmount
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to calculate trade value', error: error.message });
    }
};

// Initiate Transaction
exports.initiateTransaction = async (req, res) => {
    try {
        const { phoneId, deliveryMethod, buyerLocation } = req.body;

        // Get phone details
        const phone = await Phone.findById(phoneId);
        if (!phone) {
            return res.status(404).json({ message: 'Phone not found' });
        }

        // Get seller details
        const seller = await User.findById(phone.sellerId);

        // Create transaction
        const transaction = new Transaction({
            buyerId: req.userId,
            sellerId: phone.sellerId,
            phoneId: phoneId,
            amount: phone.price,
            deliveryMethod: deliveryMethod,
            buyerLocation: buyerLocation,
            sellerLocation: seller.location,
            paymentMethod: 'pending', // To be updated after payment
            status: 'pending'
        });

        await transaction.save();

        res.status(201).json({
            message: 'Transaction initiated',
            transaction: {
                id: transaction._id,
                amount: transaction.amount,
                status: transaction.status
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to initiate transaction', error: error.message });
    }
};

// Get User Transactions
exports.getUserTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ buyerId: req.userId }, { sellerId: req.userId }]
        })
            .populate('phoneId')
            .populate('buyerId', 'fullName email phone')
            .populate('sellerId', 'fullName email phone')
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
    }
};

// Update Transaction Status
exports.updateTransactionStatus = async (req, res) => {
    try {
        const { status, trackingNumber, courierProvider } = req.body;

        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Verify authorization
        if (transaction.sellerId.toString() !== req.userId && transaction.buyerId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        transaction.status = status;
        if (trackingNumber) transaction.trackingNumber = trackingNumber;
        if (courierProvider) transaction.courierProvider = courierProvider;

        if (status === 'completed') {
            transaction.completedAt = Date.now();
            // Update seller stats
            await User.findByIdAndUpdate(transaction.sellerId, {
                $inc: { totalSales: 1, totalEarnings: transaction.amount }
            });
        }

        await transaction.save();

        res.json({ message: 'Transaction updated', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update transaction', error: error.message });
    }
};
