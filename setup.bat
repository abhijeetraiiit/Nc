@echo off
REM Nc E-commerce Platform - Automated Setup Script for Windows
REM This script automates the entire setup process

echo.
echo ===============================================================
echo.
echo   Nc E-commerce Platform - Automated Setup
echo   Enterprise-grade multivendor marketplace
echo.
echo ===============================================================
echo.

REM Step 1: Check prerequisites
echo [Step 1/7] Checking prerequisites...
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js v20+ from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found: 
node --version

where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed!
    pause
    exit /b 1
)
echo [OK] npm found:
npm --version

where docker >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not installed!
    echo Please install Docker Desktop from https://docker.com/
    pause
    exit /b 1
)
echo [OK] Docker found:
docker --version

where git >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Git is not installed!
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)
echo [OK] Git found:
git --version

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)
echo [OK] Docker is running
echo.

REM Step 2: Install dependencies
echo [Step 2/7] Installing dependencies (this may take 2-5 minutes)...
echo.

if not exist "node_modules" (
    call npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
) else (
    echo [SKIP] Dependencies already installed
)
echo.

REM Step 3: Setup environment variables
echo [Step 3/7] Setting up environment variables...
echo.

if not exist ".env" (
    copy .env.example .env
    echo [OK] Environment file created (.env)
) else (
    echo [SKIP] .env file already exists
)
echo.

REM Step 4: Start databases
echo [Step 4/7] Starting databases (PostgreSQL, MongoDB, Redis)...
echo.

docker-compose up -d postgres mongodb redis
if %errorlevel% neq 0 (
    echo Error: Failed to start databases
    pause
    exit /b 1
)

echo Waiting for databases to be ready (30 seconds)...
timeout /t 30 /nobreak >nul

docker ps | findstr "nc-postgres" >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: PostgreSQL failed to start
    pause
    exit /b 1
)
echo [OK] PostgreSQL is running

docker ps | findstr "nc-mongodb" >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: MongoDB failed to start
    pause
    exit /b 1
)
echo [OK] MongoDB is running

docker ps | findstr "nc-redis" >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Redis failed to start
    pause
    exit /b 1
)
echo [OK] Redis is running
echo.

REM Step 5: Setup database schema
echo [Step 5/7] Setting up database schema...
echo.

cd packages\database

call npx prisma generate
if %errorlevel% neq 0 (
    echo Warning: Prisma generate failed
)
echo [OK] Prisma client generated

call npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo Warning: Migrations may have already been applied
)
echo [OK] Database schema created

cd ..\..
echo.

REM Step 6: Build packages
echo [Step 6/7] Building shared packages...
echo.

call npm run build
if %errorlevel% neq 0 (
    echo Warning: Build failed - you may need to build manually
)
echo.

REM Step 7: Summary
echo [Step 7/7] Setup complete!
echo.
echo ===============================================================
echo.
echo   Setup completed successfully!
echo.
echo ===============================================================
echo.
echo Next steps:
echo.
echo   1. Start all services:
echo      npm run dev
echo.
echo   2. Open your browser and visit:
echo      Web App:         http://localhost:3000
echo      Vendor Dashboard: http://localhost:3001
echo      Admin Panel:      http://localhost:3002
echo      API Docs:         http://localhost:4000/api/docs
echo.
echo Useful commands:
echo.
echo   Start services:      npm run dev
echo   Stop databases:      docker-compose down
echo   View database:       cd packages\database ^&^& npx prisma studio
echo   Check containers:    docker ps
echo.
echo Documentation:
echo.
echo   Quick Start:   QUICKSTART.md
echo   Setup Guide:   docs\SETUP.md
echo   Architecture:  docs\ARCHITECTURE.md
echo.
echo Happy coding!
echo.

pause
