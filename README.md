# MobileTrade - C2C Mobile Phone Trading Platform

A minimalistic, classy web platform for consumer-to-consumer mobile phone trading, inspired by Apple's iStore design.

## Features

- **Frontend**: Clean, modern UI with glassmorphism effects
- **Backend**: Node.js + Express.js with JWT authentication
- **Database**: MongoDB with Mongoose schemas
- **Responsive Design**: Mobile-first approach
- **Trade-in Calculator**: Estimate phone values
- **User Authentication**: Secure login/register

## Project Structure

```
MobileTrade/
├── index.html          # Main frontend page
├── styles.css          # Glassmorphism styling
├── script.js           # Frontend interactivity
└── backend/
    ├── server.js       # Express server
    ├── models/
    │   ├── User.js     # User schema
    │   └── Phone.js    # Phone listing schema
    ├── routes/
    │   ├── users.js    # User API routes
    │   └── phones.js   # Phone API routes
    └── package.json    # Backend dependencies
```

## Setup Instructions

### Frontend
1. Open `index.html` in a web browser (static files, no server needed for demo).

### Backend
1. Navigate to `backend/` directory.
2. Install dependencies: `npm install`
3. Set up MongoDB (local or MongoDB Atlas).
4. Create `.env` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017/mobiletrade
   JWT_SECRET=your_jwt_secret
   ```
5. Run server: `npm start` or `npm run dev`

## Deployment

- **Frontend**: Deploy `index.html`, `styles.css`, `script.js` to Netlify or Vercel.
- **Backend**: Deploy `backend/` to Heroku or Render.
- **Database**: Use MongoDB Atlas for production.

## API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/phones` - Get phone listings
- `POST /api/phones` - Create phone listing (authenticated)

## Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)
- Node.js, Express.js
- MongoDB, Mongoose
- JWT for authentication
- Glassmorphism design
│   │   └── script.js             # Frontend logic
│   └── pages/                     # Additional pages (expandable)
│
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
│   ├── .env.example              # Environment variables template
│   │
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Phone.js              # Phone listing schema
│   │   ├── Transaction.js        # Transaction schema
│   │   └── Review.js             # Review schema
│   │
│   ├── routes/
│   │   ├── users.js              # User endpoints
│   │   ├── phones.js             # Phone listing endpoints
│   │   ├── transactions.js       # Transaction endpoints
│   │   └── reviews.js            # Review endpoints
│   │
│   ├── controllers/
│   │   ├── userController.js     # User logic
│   │   ├── phoneController.js    # Phone listing logic
│   │   ├── transactionController.js  # Transaction logic
│   │   └── reviewController.js   # Review logic
│   │
│   ├── middleware/
│   │   └── auth.js               # JWT authentication
│   │
│   └── config/
│       ├── payfast.js            # PayFast integration
│       ├── stripe.js             # Stripe integration
│       └── courier.js            # Courier integration
│
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- Git

### Installation

#### 1. Clone Repository
```bash
git clone <repo-url>
cd MobileTrade
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# Update MONGODB_URI, JWT_SECRET, API keys
nano .env

# Start development server
npm run dev
```

#### 3. Frontend Setup
```bash
cd ../frontend

# For development with Python's simple server
python -m http.server 3000

# OR use Node.js http-server
npm install -g http-server
http-server -p 3000
```

### Access the Application
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🔐 Authentication

### Register New User
```bash
POST /api/users/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+27123456789",
  "password": "SecurePassword123",
  "idNumber": "1234567890123"
}
```

### Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "john@example.com",
    "kycStatus": "pending"
  }
}
```

## 📱 API Endpoints

### Users
- `POST /api/users/register` - Create new account
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `GET /api/users/seller-stats` - Get seller statistics (protected)

### Phones
- `GET /api/phones` - Get all listings (with filters)
- `GET /api/phones/:id` - Get listing details
- `POST /api/phones` - Create listing (protected)
- `PUT /api/phones/:id` - Update listing (protected)
- `DELETE /api/phones/:id` - Delete listing (protected)
- `GET /api/phones/seller/my-listings` - Get user's listings (protected)

### Transactions
- `POST /api/transactions/calculate-trade-value` - Calculate trade-in value (protected)
- `POST /api/transactions/initiate` - Start transaction (protected)
- `GET /api/transactions` - Get user transactions (protected)
- `PUT /api/transactions/:id/status` - Update transaction status (protected)

### Reviews
- `GET /api/reviews/user/:userId` - Get user reviews
- `POST /api/reviews` - Create review (protected)
- `GET /api/reviews/:id` - Get review details
- `GET /api/reviews/dashboard/stats` - Get dashboard stats (protected)

## 💳 Payment Integration

### PayFast (South Africa)
```javascript
const PayFastService = require('./config/payfast');
const payfast = new PayFastService();

// Create payment
const params = payfast.createPaymentRequest({
  transactionId: 'TXN123456',
  amount: 12500,
  buyerEmail: 'buyer@example.com',
  buyerName: 'John Doe',
  phoneModel: 'iPhone 13 Pro'
});

const paymentURL = payfast.getPaymentFormURL(params);
// Redirect user to paymentURL
```

### Stripe
```javascript
const StripeService = require('./config/stripe');
const stripe = new StripeService();

// Create payment intent
const intent = await stripe.createPaymentIntent({
  amount: 12500,
  currency: 'ZAR',
  buyerEmail: 'buyer@example.com',
  description: 'iPhone 13 Pro purchase'
});

// Return clientSecret to frontend
```

## 🚚 Logistics Integration

### Get Shipping Rates
```javascript
const CourierService = require('./config/courier');
const courier = new CourierService('thecourierguy');

const rates = await courier.getShippingRates({
  fromCity: 'Johannesburg',
  toCity: 'Cape Town',
  weight: 0.3 // kg
});
```

### Create Shipment
```javascript
const shipment = await courier.createShipment({
  senderName: 'John Doe',
  senderPhone: '+27123456789',
  senderCity: 'Johannesburg',
  recipientName: 'Jane Smith',
  recipientPhone: '+27987654321',
  recipientCity: 'Cape Town',
  recipientAddress: '123 Main Street, Cape Town',
  weight: 0.3,
  contents: 'Mobile Phone - iPhone 13 Pro',
  value: 12500
});

// Returns tracking number and estimated delivery
```

### Track Shipment
```javascript
const tracking = await courier.trackShipment('TRK123456789');
// Returns status, location, and tracking events
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  idNumber: String,
  kycStatus: 'pending' | 'verified' | 'rejected',
  isVerifiedSeller: Boolean,
  rating: Number (1-5),
  totalSales: Number,
  totalEarnings: Number,
  location: String,
  createdAt: Date
}
```

### Phone Collection
```javascript
{
  _id: ObjectId,
  sellerId: ObjectId (ref: User),
  brand: String,
  model: String,
  price: Number,
  storage: String,
  condition: 'excellent' | 'good' | 'fair' | 'poor',
  description: String,
  photos: [String],
  location: String,
  status: 'active' | 'sold' | 'removed',
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 Deployment

### Frontend Deployment (Netlify/Vercel)

#### Using Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=frontend
```

#### Using Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

### Backend Deployment (Heroku/Render)

#### Using Heroku
```bash
# Install Heroku CLI
# Create Heroku app
heroku create mobiletrade-api

# Set environment variables
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<your-jwt-secret>
heroku config:set PAYFAST_MERCHANT_ID=<your-merchant-id>

# Deploy
git push heroku main
```

#### Using Render
```bash
# Connect GitHub repository to Render
# Create new Web Service
# Set environment variables in dashboard
# Deploy from GitHub
```

### Database Deployment (MongoDB Atlas)

1. Create account at mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Add to `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mobiletrade
```

## 📊 Multi-City Pilot Deployment

### Phase 1: Johannesburg & Cape Town
- Launch with verified seller program
- Partner with local couriers
- Marketing in tech communities

### Phase 2: Expansion
- Add Durban, Pretoria, Port Elizabeth
- Increase seller verification
- Partner with additional logistics

## 🔒 Security Features

- JWT Token-based authentication
- Bcrypt password hashing
- CORS protection
- Environment variable protection
- KYC ID document verification
- Seller verification badge system
- Transaction encryption ready

## 📚 Technologies Used

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- Responsive design (mobile-first)
- No external dependencies (lightweight)
- Optional: React upgrade path

### Backend
- Node.js + Express.js
- MongoDB + Mongoose ODM
- JWT Authentication
- bcryptjs for password security

### Integrations
- **Payments**: PayFast, Stripe
- **Logistics**: Aramex, The Courier Guy
- **Database**: MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📧 Support & Contact

- Email: support@mobiletrade.co.za
- Website: www.mobiletrade.co.za
- Twitter: @MobileTradeSA

## 📄 License

MIT License - See LICENSE file for details

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [PayFast Documentation](https://www.payfast.co.za/help/integration)
- [Stripe Documentation](https://stripe.com/docs)

---

**Made with ❤️ for South Africa's Tech Community**

Last Updated: May 2026
