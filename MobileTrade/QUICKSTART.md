# MobileTrade - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Download & Navigate
```bash
cd MobileTrade
```

### 2. Run Setup Script

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

### 3. Update Configuration
```bash
cd backend
nano .env
```

Update these essential fields:
```env
MONGODB_URI=mongodb://localhost:27017/mobiletrade
JWT_SECRET=your_random_secret_key_123
```

### 4. Start Backend
```bash
npm run dev
```

Expected output:
```
╔════════════════════════════════════════╗
║      🚀 MobileTrade API Server 🚀    ║
║      Running on http://localhost:5000 ║
║      Environment: development         ║
╚════════════════════════════════════════╝
```

### 5. Start Frontend (New Terminal)
```bash
cd frontend
python -m http.server 3000
```

### 6. Open Browser
Navigate to: **http://localhost:3000**

## 🧪 Testing the Application

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@test.co.za",
    "phone": "+27123456789",
    "password": "Test@123456",
    "idNumber": "9001011234567"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@test.co.za",
    "fullName": "John Doe",
    "kycStatus": "pending"
  }
}
```

### Test User Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.co.za",
    "password": "Test@123456"
  }'
```

### Test Phone Listings
```bash
# Get all listings
curl http://localhost:5000/api/phones

# Search for specific brand
curl "http://localhost:5000/api/phones?brand=iPhone&condition=excellent"

# Get single listing
curl http://localhost:5000/api/phones/507f1f77bcf86cd799439012
```

### Test Creating a Phone Listing
```bash
curl -X POST http://localhost:5000/api/phones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "brand": "Samsung",
    "model": "Galaxy S21 Ultra",
    "price": 11999,
    "storage": "256GB",
    "color": "Black",
    "condition": "excellent",
    "description": "Like new, original box and accessories included",
    "location": "Johannesburg"
  }'
```

### Test Trade-In Calculator
```bash
curl -X POST http://localhost:5000/api/transactions/calculate-trade-value \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "oldBrand": "iPhone",
    "oldModel": "iPhone 12",
    "condition": "good",
    "newPhoneId": "507f1f77bcf86cd799439012"
  }'
```

## 🗂️ Project Navigation

### Frontend Files
- **index.html** - Main page (Home, Marketplace, Trade-in, Login)
- **css/styles.css** - All styling (mobile-responsive)
- **js/script.js** - Client-side logic

### Backend Files
- **server.js** - Express server setup
- **routes/** - API endpoint definitions
- **controllers/** - Business logic
- **models/** - Database schemas
- **config/** - Third-party integrations
- **middleware/** - Authentication & utilities

## 📦 Key Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT auth
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

### Frontend
- Vanilla JavaScript (no dependencies!)
- HTML5
- CSS3

## 🔧 Common Tasks

### Add New Phone Brand
Edit `frontend/index.html` and `backend/models/Phone.js`:

1. Add to enum in Phone schema:
   ```javascript
   brand: {
       enum: ['iPhone', 'Samsung', 'Huawei', 'Xiaomi', 'OnePlus', 'Google', 'YOUR_BRAND']
   }
   ```

2. Add to frontend select:
   ```html
   <option value="YOUR_BRAND">YOUR_BRAND</option>
   ```

### Add New Transaction Status
Edit `backend/models/Transaction.js`:

```javascript
status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'completed', 'YOUR_STATUS'],
    default: 'pending'
}
```

### Enable Seller Badge
```bash
# In MongoDB
db.users.updateOne(
  { email: "john@test.co.za" },
  { $set: { isVerifiedSeller: true, kycStatus: "verified" } }
)
```

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Start MongoDB: `mongod` (local) or
- Use MongoDB Atlas: Update MONGODB_URI in .env

### "Port 5000 already in use"
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID PROCESS_ID /F

# Mac/Linux
lsof -i :5000
kill -9 PROCESS_ID
```

### "CORS error"
Check that backend and frontend URLs are correct:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### "Token expired"
Register/login again to get new token

## 📚 Next Steps

1. **Set up Payments**
   - Get PayFast merchant account: payfast.co.za
   - Or Stripe account: stripe.com

2. **Connect Courier APIs**
   - Register with Aramex or The Courier Guy
   - Add API keys to .env

3. **Deploy to Production**
   - See DEPLOYMENT.md for full guide

4. **Customize Branding**
   - Update colors in `frontend/css/styles.css`
   - Modify navbar logo in `frontend/index.html`

## 💡 Pro Tips

- Use Postman (postman.com) for easier API testing
- Enable Redux DevTools for frontend debugging
- Set up MongoDB Atlas for cloud database
- Use environment variables for all sensitive data
- Test payments in sandbox mode before live

## 🆘 Getting Help

### Documentation
- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com)

### Support
- GitHub Issues: Report bugs
- Email: support@mobiletrade.co.za
- Twitter: @MobileTradeSA

## 📝 Useful Commands

```bash
# Backend
npm run dev              # Development server with auto-reload
npm start               # Production server
npm install             # Install dependencies

# Frontend
python -m http.server 3000    # Simple HTTP server
npx http-server -p 3000       # Alternative

# Database
mongosh                 # MongoDB shell
mongo --version         # Check MongoDB version

# Git
git status              # Check changes
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to repository
```

## 🎯 Feature Checklist

- [x] User registration & login
- [x] Phone listings (CRUD)
- [x] Trade-in calculator
- [x] Seller ratings & reviews
- [x] Transaction management
- [x] KYC verification prep
- [ ] Payment gateway integration
- [ ] Courier API integration
- [ ] Email notifications
- [ ] Admin dashboard

---

**Happy Trading! 🚀**

For detailed documentation, see README.md
For deployment instructions, see DEPLOYMENT.md
