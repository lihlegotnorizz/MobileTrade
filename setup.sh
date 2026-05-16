#!/bin/bash

# MobileTrade - Setup Script for Linux/Mac

echo "╔════════════════════════════════════════╗"
echo "║     🚀 MobileTrade Setup Script 🚀   ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check npm installation
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed locally. Using MongoDB Atlas is recommended."
    echo "   Visit: https://www.mongodb.com/cloud/atlas"
fi

echo ""
echo "📦 Installing Backend Dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"

echo ""
echo "📝 Setting up Environment Variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file (please update with your credentials)"
else
    echo "ℹ️  .env file already exists"
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  python -m http.server 3000"
echo ""
echo "Then open: http://localhost:3000"
echo ""
