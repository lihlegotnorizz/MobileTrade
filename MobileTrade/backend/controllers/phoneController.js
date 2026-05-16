const Phone = require('../models/Phone');
const User = require('../models/User');

// Get All Phone Listings
exports.getAllListings = async (req, res) => {
    try {
        const { brand, condition, minPrice, maxPrice, location, search } = req.query;

        let query = { status: 'active' };

        if (brand) query.brand = brand;
        if (condition) query.condition = condition;
        if (location) query.location = location;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        if (search) {
            query.$or = [
                { model: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const listings = await Phone.find(query)
            .populate('sellerId', 'fullName rating isVerifiedSeller location')
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch listings', error: error.message });
    }
};

// Get Single Listing
exports.getListing = async (req, res) => {
    try {
        const listing = await Phone.findById(req.params.id)
            .populate('sellerId', 'fullName rating isVerifiedSeller location phone');

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Increment views
        listing.views += 1;
        await listing.save();

        res.json(listing);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch listing', error: error.message });
    }
};

// Create Listing
exports.createListing = async (req, res) => {
    try {
        const { brand, model, price, storage, color, condition, description, location } = req.body;

        const phone = new Phone({
            sellerId: req.userId,
            brand,
            model,
            price,
            storage,
            color,
            condition,
            description,
            location,
            photos: [], // In production, handle file uploads
        });

        await phone.save();

        res.status(201).json({
            message: 'Listing created successfully',
            phone
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create listing', error: error.message });
    }
};

// Update Listing
exports.updateListing = async (req, res) => {
    try {
        const phone = await Phone.findById(req.params.id);

        if (!phone) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        if (phone.sellerId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to update this listing' });
        }

        const { price, condition, description, status } = req.body;

        if (price) phone.price = price;
        if (condition) phone.condition = condition;
        if (description) phone.description = description;
        if (status) phone.status = status;

        phone.updatedAt = Date.now();
        await phone.save();

        res.json({ message: 'Listing updated successfully', phone });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update listing', error: error.message });
    }
};

// Delete Listing
exports.deleteListing = async (req, res) => {
    try {
        const phone = await Phone.findById(req.params.id);

        if (!phone) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        if (phone.sellerId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this listing' });
        }

        await Phone.findByIdAndDelete(req.params.id);

        res.json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete listing', error: error.message });
    }
};

// Get Seller's Listings
exports.getSellerListings = async (req, res) => {
    try {
        const listings = await Phone.find({ sellerId: req.userId })
            .sort({ createdAt: -1 });

        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch listings', error: error.message });
    }
};
