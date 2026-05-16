@echo off
REM MobileTrade - Setup Script for Windows

echo.
echo ╔════════════════════════════════════════╗
echo ║     🚀 MobileTrade Setup Script 🚀   ║
echo ╚════════════════════════════════════════╝
echo.

REM Check Node.js installation
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

REM Check npm installation
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%

echo.
echo 📦 Installing Backend Dependencies...
cd backend
call npm install
echo ✅ Backend dependencies installed

echo.
echo 📝 Setting up Environment Variables...
if not exist .env (
    copy .env.example .env
    echo ✅ Created .env file ^(please update with your credentials^)
) else (
    echo ℹ️  .env file already exists
)

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   python -m http.server 3000
echo.
echo Then open: http://localhost:3000
echo.
pause
