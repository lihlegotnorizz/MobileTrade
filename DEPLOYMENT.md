# MobileTrade Deployment Guide

## Overview
This guide covers deploying MobileTrade to production across frontend, backend, and database services.

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    GLOBAL USERS                         │
└─────────────────┬───────────────────────────────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
┌─────▼─────┐         ┌──────▼──────┐
│  Netlify  │         │   Vercel    │
│ (Frontend)│         │  (Frontend) │
└─────┬─────┘         └──────┬──────┘
      │                      │
      └──────────┬───────────┘
                 │ CDN
                 │
      ┌──────────▼──────────┐
      │  API Requests       │
      └──────────┬──────────┘
                 │
     ┌───────────┴───────────┐
     │                       │
┌────▼─────┐        ┌───────▼──────┐
│  Heroku  │        │    Render    │
│(Backend) │        │  (Backend)   │
└────┬─────┘        └───────┬──────┘
     │                      │
     └──────────┬───────────┘
                │
        ┌───────▼────────┐
        │ MongoDB Atlas  │
        │    (Database)  │
        └────────────────┘
```

## Phase 1: Frontend Deployment

### Option A: Deploy to Netlify

#### Prerequisites
- GitHub account with repository
- Netlify account

#### Steps
1. **Connect GitHub to Netlify**
   - Go to netlify.com
   - Click "New site from Git"
   - Authorize GitHub
   - Select MobileTrade repository

2. **Configure Build Settings**
   - Build command: `# (none, using vanilla JS)`
   - Publish directory: `frontend`

3. **Deploy**
   - Netlify automatically deploys on push to main branch
   - Custom domain: Add in Domain Settings

4. **Environment Configuration**
   - Set environment variable in Netlify:
   ```
   REACT_APP_API_URL=https://api.mobiletrade.co.za
   ```

### Option B: Deploy to Vercel

#### Steps
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure Environment**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL https://api.mobiletrade.co.za
   ```

## Phase 2: Backend Deployment

### Option A: Deploy to Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps
1. **Create Heroku App**
   ```bash
   heroku login
   heroku create mobiletrade-api
   ```

2. **Configure Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_super_secret_key_123456789
   heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mobiletrade
   heroku config:set PAYFAST_MERCHANT_ID=your_merchant_id
   heroku config:set PAYFAST_MERCHANT_KEY=your_merchant_key
   heroku config:set STRIPE_SECRET_KEY=sk_live_your_key
   heroku config:set STRIPE_PUBLIC_KEY=pk_live_your_key
   heroku config:set ARAMEX_API_KEY=your_aramex_key
   heroku config:set COURIER_GUY_API_KEY=your_courier_guy_key
   ```

3. **Deploy Application**
   ```bash
   # Add remote if not done automatically
   git remote add heroku https://git.heroku.com/mobiletrade-api.git
   
   # Push to Heroku
   git push heroku main
   ```

4. **View Logs**
   ```bash
   heroku logs --tail
   ```

5. **Domain Configuration**
   - Heroku provides free domain: `mobiletrade-api.herokuapp.com`
   - Add custom domain: `heroku domains:add api.mobiletrade.co.za`

### Option B: Deploy to Render

#### Prerequisites
- Render account
- GitHub repository

#### Steps
1. **Create Web Service**
   - Go to render.com
   - New → Web Service
   - Connect GitHub repository

2. **Configure Build Settings**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Root Directory: `/backend`

3. **Set Environment Variables**
   Add in Render dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mobiletrade
   JWT_SECRET=your_secret_key
   PAYFAST_MERCHANT_ID=your_id
   (... and other keys)
   ```

4. **Deploy**
   - Render auto-deploys on git push
   - Monitor deployment in dashboard

## Phase 3: Database Deployment (MongoDB Atlas)

### Setup MongoDB Atlas

1. **Create Account**
   - Go to mongodb.com/atlas
   - Sign up for free account

2. **Create Cluster**
   - Click "Create" button
   - Select free tier
   - Choose region closest to South Africa (usually eu-west-1 for best latency)
   - Cluster name: `mobiletrade-prod`

3. **Configure Network Access**
   - Add IP Address: Allow access from backend server IP
   - Or: Allow 0.0.0.0/0 (less secure, for development)

4. **Create Database User**
   - Go to Security → Database Access
   - Add Database User with strong password
   - Username: `mobiletrade_user`

5. **Get Connection String**
   - Click "Connect" on cluster
   - Copy connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/mobiletrade`

6. **Initialize Collections**
   ```bash
   # Collections are auto-created by Mongoose models
   # Or manually create in MongoDB Atlas dashboard
   ```

## Environment Configuration for Production

### Backend .env (Production)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://mobiletrade_user:SecurePassword123@cluster.mongodb.net/mobiletrade

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production_12345

# PayFast (Live Credentials)
PAYFAST_MERCHANT_ID=10000100
PAYFAST_MERCHANT_KEY=your_live_merchant_key
PAYFAST_API_URL=https://www.payfast.co.za/

# Stripe (Live Credentials)
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_PUBLIC_KEY=pk_live_your_live_key

# Courier APIs
ARAMEX_API_KEY=your_aramex_live_key
ARAMEX_API_URL=https://ws.aramex.com/

COURIER_GUY_API_KEY=your_courier_guy_live_key
COURIER_GUY_API_URL=https://api.thecourierguy.co.za/

# Email Configuration
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@mobiletrade.co.za

# AWS S3 for Documents
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=mobiletrade-prod-docs
AWS_S3_REGION=af-south-1

# CORS
CORS_ORIGIN=https://mobiletrade.co.za,https://app.mobiletrade.co.za
```

## SSL/TLS Certificates

### Auto-configuration (Recommended)
- **Netlify/Vercel**: Automatic SSL via Let's Encrypt
- **Heroku**: Free SSL included
- **Render**: Free SSL included

### Custom Domain SSL
```bash
# For Heroku custom domain
heroku certs:auto:enable

# For Render
# Automatic in dashboard
```

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy MobileTrade

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy Frontend to Netlify
      uses: netlify/actions/cli@master
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      with:
        args: deploy --prod --dir=frontend
    
    - name: Deploy Backend to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: mobiletrade-api
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
        usedocker: false
        appdir: backend
```

## Monitoring & Logging

### Application Monitoring
- **Heroku**: `heroku logs --tail`
- **Render**: Dashboard → Logs
- **Netlify**: Deployment logs in dashboard

### Database Monitoring
- MongoDB Atlas dashboard for metrics
- Set up alerts for slow queries

### Uptime Monitoring
- Use services like Uptime Robot
- Monitor both frontend and backend health endpoints

## Scaling & Performance

### Frontend Optimization
- Enable caching on Netlify/Vercel
- Use CDN for static assets
- Minify CSS/JS

### Backend Optimization
- Use MongoDB indexes
- Implement caching layer (Redis)
- Enable gzip compression

### Database Optimization
- Create indexes on frequently queried fields
- Archive old transactions
- Monitor connection pool

## Disaster Recovery

### Backup Strategy
```bash
# MongoDB Atlas automatic backups (included)
# Manual backup:
mongodump --uri="mongodb+srv://..." --out=./backup

# Restore:
mongorestore ./backup
```

### Rollback Procedure
```bash
# Heroku rollback
heroku releases
heroku rollback v123

# Render: Redeploy previous commit
# Netlify: Rollback in dashboard
```

## Multi-City Pilot Deployment

### Phase 1: Johannesburg & Cape Town
- Single deployment serving both cities
- No geographic sharding needed

### Phase 2: Regional Expansion
- Consider regional databases if latency becomes issue
- South Africa: af-south-1 (Cape Town) for best performance

## Security Checklist

- [ ] SSL/TLS enabled on all endpoints
- [ ] HTTPS enforced
- [ ] Environment variables not in code
- [ ] Database credentials secured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] MongoDB IP whitelist configured
- [ ] Regular security updates

## Testing Checklist

- [ ] Load testing (50+ concurrent users)
- [ ] Payment gateway testing with live credentials
- [ ] Courier API integration testing
- [ ] KYC verification flow testing
- [ ] Transaction completion flow testing

---

**Deployment Support**

For issues or questions:
- Check service provider documentation
- Review logs for error messages
- Contact support@mobiletrade.co.za
