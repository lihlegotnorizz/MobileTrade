const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mobiletrade', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/phones', require('./routes/phones'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// ============= ERROR HANDLING =============
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

// ============= 404 HANDLER =============
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ============= START SERVER =============
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║      🚀 MobileTrade API Server 🚀    ║
    ║      Running on http://localhost:${PORT}      ║
    ║      Environment: ${process.env.NODE_ENV || 'development'}          ║
    ╚════════════════════════════════════════╝
    `);
});

module.exports = app;
