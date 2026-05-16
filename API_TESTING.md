# MobileTrade - API Testing Examples

## Using Postman or cURL

### Collection: MobileTrade API Tests

---

## 1️⃣ Authentication Endpoints

### Register New User
```http
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.co.za",
  "phone": "+27 123 456 7890",
  "password": "SecurePass123!",
  "idNumber": "9001011234567"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.co.za",
    "fullName": "John Doe",
    "kycStatus": "pending"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Login User
```http
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "john@example.co.za",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.co.za",
    "fullName": "John Doe",
    "kycStatus": "pending",
    "isVerifiedSeller": false,
    "rating": 5.0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Get User Profile
```http
GET http://localhost:5000/api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john@example.co.za",
  "phone": "+27 123 456 7890",
  "kycStatus": "pending",
  "isVerifiedSeller": false,
  "rating": 5.0,
  "totalSales": 0,
  "totalEarnings": 0,
  "location": "Johannesburg"
}
```

---

## 2️⃣ Phone Listing Endpoints

### Get All Listings
```http
GET http://localhost:5000/api/phones
```

**Optional Query Parameters:**
```
?brand=iPhone
?condition=excellent
?minPrice=5000
?maxPrice=15000
?location=Johannesburg
?search=iPhone%2013
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "brand": "iPhone",
    "model": "iPhone 13 Pro",
    "price": 12500,
    "condition": "excellent",
    "storage": "256GB",
    "location": "Johannesburg",
    "views": 15,
    "sellerId": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "rating": 4.8,
      "isVerifiedSeller": true
    },
    "createdAt": "2026-05-13T10:30:00.000Z"
  }
]
```

---

### Get Single Listing
```http
GET http://localhost:5000/api/phones/507f1f77bcf86cd799439012
```

---

### Create Phone Listing
```http
POST http://localhost:5000/api/phones
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "brand": "Samsung",
  "model": "Galaxy S21 Ultra",
  "price": 11999,
  "storage": "256GB",
  "color": "Phantom Black",
  "condition": "excellent",
  "description": "Like new condition, original box and accessories included. No scratches or damage.",
  "location": "Johannesburg"
}
```

**Response:**
```json
{
  "message": "Listing created successfully",
  "phone": {
    "_id": "507f1f77bcf86cd799439013",
    "sellerId": "507f1f77bcf86cd799439011",
    "brand": "Samsung",
    "model": "Galaxy S21 Ultra",
    "price": 11999,
    "storage": "256GB",
    "condition": "excellent",
    "location": "Johannesburg",
    "status": "active",
    "views": 0,
    "createdAt": "2026-05-13T10:35:00.000Z"
  }
}
```

---

### Update Phone Listing
```http
PUT http://localhost:5000/api/phones/507f1f77bcf86cd799439013
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "price": 11500,
  "condition": "good",
  "description": "Updated description with more details"
}
```

---

### Delete Phone Listing
```http
DELETE http://localhost:5000/api/phones/507f1f77bcf86cd799439013
Authorization: Bearer YOUR_TOKEN
```

---

## 3️⃣ Trade-In Calculator

### Calculate Trade Value
```http
POST http://localhost:5000/api/transactions/calculate-trade-value
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "oldBrand": "iPhone",
  "oldModel": "iPhone 12",
  "condition": "good",
  "newPhoneId": "507f1f77bcf86cd799439012"
}
```

**Response:**
```json
{
  "oldPhoneValue": 8500,
  "newPhonePrice": 12500,
  "topupAmount": 4000,
  "savings": 8500
}
```

---

## 4️⃣ Transaction Endpoints

### Initiate Transaction
```http
POST http://localhost:5000/api/transactions/initiate
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "phoneId": "507f1f77bcf86cd799439012",
  "deliveryMethod": "courier",
  "buyerLocation": "Cape Town"
}
```

**Response:**
```json
{
  "message": "Transaction initiated",
  "transaction": {
    "id": "507f1f77bcf86cd799439014",
    "amount": 12500,
    "status": "pending"
  }
}
```

---

### Get User Transactions
```http
GET http://localhost:5000/api/transactions
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "amount": 12500,
    "status": "pending",
    "paymentMethod": "pending",
    "deliveryMethod": "courier",
    "buyerLocation": "Cape Town",
    "createdAt": "2026-05-13T11:00:00.000Z",
    "phoneId": {
      "brand": "iPhone",
      "model": "iPhone 13 Pro"
    },
    "buyerId": {
      "fullName": "Jane Smith"
    },
    "sellerId": {
      "fullName": "John Doe"
    }
  }
]
```

---

### Update Transaction Status
```http
PUT http://localhost:5000/api/transactions/507f1f77bcf86cd799439014/status
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "status": "shipped",
  "trackingNumber": "TRK123456789",
  "courierProvider": "The Courier Guy"
}
```

---

## 5️⃣ Review Endpoints

### Create Review
```http
POST http://localhost:5000/api/reviews
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "revieweeId": "507f1f77bcf86cd799439011",
  "transactionId": "507f1f77bcf86cd799439014",
  "rating": 5,
  "comment": "Excellent seller! Fast shipping and perfect condition item.",
  "communicationRating": 5,
  "itemAccuracyRating": 5,
  "shippingRating": 5
}
```

---

### Get User Reviews
```http
GET http://localhost:5000/api/reviews/user/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "reviews": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "rating": 5,
      "comment": "Excellent seller! Fast shipping and perfect condition item.",
      "communicationRating": 5,
      "itemAccuracyRating": 5,
      "shippingRating": 5,
      "reviewerId": {
        "fullName": "Jane Smith"
      },
      "createdAt": "2026-05-13T11:30:00.000Z"
    }
  ],
  "averageRating": "4.8",
  "totalReviews": 15
}
```

---

### Get Dashboard Stats
```http
GET http://localhost:5000/api/reviews/dashboard/stats
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.co.za",
    "rating": "4.8",
    "totalSales": 25,
    "totalEarnings": 287500,
    "isVerifiedSeller": true,
    "kycStatus": "verified"
  },
  "stats": {
    "totalReviews": 20,
    "salesCount": 25,
    "earnings": 287500
  }
}
```

---

## 🔄 Complete User Journey

### 1. Register
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "email": "jane@example.co.za",
    "phone": "+27987654321",
    "password": "SecurePass123!",
    "idNumber": "9505011234567"
  }'
```

Save the returned `token`.

### 2. Create Listing
```bash
curl -X POST http://localhost:5000/api/phones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "brand": "iPhone",
    "model": "iPhone 13 Pro",
    "price": 12500,
    "storage": "256GB",
    "condition": "excellent",
    "description": "Like new",
    "location": "Cape Town"
  }'
```

Save the returned `_id`.

### 3. Search Listings
```bash
curl "http://localhost:5000/api/phones?brand=iPhone&condition=excellent"
```

### 4. View Listing Details
```bash
curl http://localhost:5000/api/phones/LISTING_ID
```

### 5. Create Transaction
```bash
curl -X POST http://localhost:5000/api/transactions/initiate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "phoneId": "LISTING_ID",
    "deliveryMethod": "courier",
    "buyerLocation": "Johannesburg"
  }'
```

### 6. Leave Review
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "revieweeId": "SELLER_ID",
    "transactionId": "TRANSACTION_ID",
    "rating": 5,
    "comment": "Great experience!",
    "communicationRating": 5,
    "itemAccuracyRating": 5,
    "shippingRating": 5
  }'
```

---

## 📊 Postman Collection Import

Create a file `MobileTrade.postman_collection.json` and import into Postman for easier testing.

---

## ✅ Testing Checklist

- [ ] User registration successful
- [ ] User login returns valid token
- [ ] Can create phone listing
- [ ] Can search and filter listings
- [ ] Trade-in calculator returns correct values
- [ ] Can initiate transaction
- [ ] Can view transaction history
- [ ] Can create and view reviews
- [ ] Seller rating updates after review
- [ ] Dashboard stats are accurate

---

**API Version:** 1.0.0  
**Last Updated:** May 2026
