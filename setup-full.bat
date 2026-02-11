@echo off
setlocal enabledelayedexpansion

echo ╔════════════════════════════════════════╗
echo ║  Nc E-Commerce - Quick Setup Script   ║
echo ║  Making it Fully Functional           ║
echo ╚════════════════════════════════════════╝
echo.

:: Step 1: Check if Docker is installed
echo Step 1: Checking Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo × Docker not found
    echo Please install Docker Desktop first:
    echo   https://www.docker.com/products/docker-desktop
    exit /b 1
)
echo ✓ Docker found
echo.

:: Step 2: Check if docker-compose is installed
echo Step 2: Checking Docker Compose...
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo × Docker Compose not found
    echo Please install Docker Compose first
    exit /b 1
)
echo ✓ Docker Compose found
echo.

:: Step 3: Start PostgreSQL and MongoDB
echo Step 3: Starting databases...
echo Starting PostgreSQL and MongoDB with Docker Compose...
docker-compose up -d postgres mongodb redis

echo Waiting for databases to be ready...
timeout /t 10 /nobreak >nul
echo ✓ Databases started
echo.

:: Step 4: Create .env if it doesn't exist
echo Step 4: Setting up environment variables...
if not exist .env (
    echo Creating .env file...
    (
        echo # Database
        echo DATABASE_URL="postgresql://postgres:password@localhost:5432/nc_ecommerce"
        echo MONGODB_URI="mongodb://localhost:27017/nc-ecommerce"
        echo REDIS_URL="redis://localhost:6379"
        echo.
        echo # JWT
        echo JWT_SECRET="nc-super-secret-jwt-key-change-this-in-production-12345"
        echo JWT_EXPIRES_IN="7d"
        echo.
        echo # API
        echo API_PORT=4000
        echo WEB_URL="http://localhost:3000"
        echo VENDOR_URL="http://localhost:3001"
        echo ADMIN_URL="http://localhost:3002"
        echo.
        echo # Node
        echo NODE_ENV="development"
    ) > .env
    echo ✓ .env file created
) else (
    echo ⚠ .env file already exists, skipping
)
echo.

:: Step 5: Install dependencies if not already installed
echo Step 5: Checking dependencies...
if not exist node_modules (
    echo Installing dependencies (this may take a few minutes)...
    call npm install
    echo ✓ Dependencies installed
) else (
    echo ✓ Dependencies already installed
)
echo.

:: Step 6: Generate Prisma client and run migrations
echo Step 6: Setting up Prisma database...
cd packages\database

echo Generating Prisma Client...
call npx prisma generate

echo Running database migrations...
call npx prisma migrate dev --name init

cd ..\..
echo ✓ Database schema created
echo.

:: Step 7: Seed the database
echo Step 7: Seeding database with dummy data...

echo Seeding PostgreSQL (users, vendors, orders)...
cd packages\database
call npx ts-node seed.ts

echo Seeding MongoDB (products)...
call npx ts-node seed-products.ts

cd ..\..
echo ✓ Database seeded with dummy data
echo.

:: Success message
echo ╔════════════════════════════════════════╗
echo ║     ✓ Setup Complete!                 ║
echo ╚════════════════════════════════════════╝
echo.

echo 📋 Test Credentials:
echo   Customer: test@example.com / password123
echo   Vendor:   vendor@example.com / password123
echo.

echo 🌐 To start the platform:
echo   npm run dev
echo.

echo Then visit:
echo   Web App:          http://localhost:3000
echo   Vendor Dashboard: http://localhost:3001
echo   Admin Panel:      http://localhost:3002
echo   API Gateway:      http://localhost:4000
echo.

echo 📖 For detailed information, see:
echo   IMPLEMENTATION-GUIDE.md
echo.

echo Happy coding! 🚀

pause
