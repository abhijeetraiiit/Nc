#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Nc E-Commerce - Quick Setup Script   ║${NC}"
echo -e "${BLUE}║  Making it Fully Functional           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Check if Docker is installed
echo -e "${YELLOW}Step 1:${NC} Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker not found${NC}"
    echo -e "${YELLOW}Please install Docker first:${NC}"
    echo "  https://docs.docker.com/get-docker/"
    exit 1
fi
echo -e "${GREEN}✓ Docker found${NC}"
echo ""

# Step 2: Check if docker-compose is installed
echo -e "${YELLOW}Step 2:${NC} Checking Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose not found${NC}"
    echo -e "${YELLOW}Please install Docker Compose first${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose found${NC}"
echo ""

# Step 3: Start PostgreSQL and MongoDB
echo -e "${YELLOW}Step 3:${NC} Starting databases..."
echo -e "${BLUE}Starting PostgreSQL and MongoDB with Docker Compose...${NC}"
docker-compose up -d postgres mongodb redis

# Wait for databases to be ready
echo -e "${BLUE}Waiting for databases to be ready...${NC}"
sleep 10
echo -e "${GREEN}✓ Databases started${NC}"
echo ""

# Step 4: Create .env if it doesn't exist
echo -e "${YELLOW}Step 4:${NC} Setting up environment variables..."
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/nc_ecommerce"
MONGODB_URI="mongodb://localhost:27017/nc-ecommerce"
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="nc-super-secret-jwt-key-change-this-in-production-12345"
JWT_EXPIRES_IN="7d"

# API
API_PORT=4000
WEB_URL="http://localhost:3000"
VENDOR_URL="http://localhost:3001"
ADMIN_URL="http://localhost:3002"

# Node
NODE_ENV="development"
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${YELLOW}⚠ .env file already exists, skipping${NC}"
fi
echo ""

# Step 5: Install dependencies if not already installed
echo -e "${YELLOW}Step 5:${NC} Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing dependencies (this may take a few minutes)...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
fi
echo ""

# Step 6: Generate Prisma client and run migrations
echo -e "${YELLOW}Step 6:${NC} Setting up Prisma database..."
cd packages/database

echo -e "${BLUE}Generating Prisma Client...${NC}"
npx prisma generate

echo -e "${BLUE}Running database migrations...${NC}"
npx prisma migrate dev --name init

cd ../..
echo -e "${GREEN}✓ Database schema created${NC}"
echo ""

# Step 7: Seed the database
echo -e "${YELLOW}Step 7:${NC} Seeding database with dummy data..."

echo -e "${BLUE}Seeding PostgreSQL (users, vendors, orders)...${NC}"
cd packages/database
npx ts-node seed.ts

echo -e "${BLUE}Seeding MongoDB (products)...${NC}"
npx ts-node seed-products.ts

cd ../..
echo -e "${GREEN}✓ Database seeded with dummy data${NC}"
echo ""

# Success message
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✓ Setup Complete!                 ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}📋 Test Credentials:${NC}"
echo "  Customer: test@example.com / password123"
echo "  Vendor:   vendor@example.com / password123"
echo ""

echo -e "${BLUE}🌐 To start the platform:${NC}"
echo "  ${GREEN}npm run dev${NC}"
echo ""

echo -e "${BLUE}Then visit:${NC}"
echo "  Web App:          ${GREEN}http://localhost:3000${NC}"
echo "  Vendor Dashboard: ${GREEN}http://localhost:3001${NC}"
echo "  Admin Panel:      ${GREEN}http://localhost:3002${NC}"
echo "  API Gateway:      ${GREEN}http://localhost:4000${NC}"
echo ""

echo -e "${YELLOW}📖 For detailed information, see:${NC}"
echo "  IMPLEMENTATION-GUIDE.md"
echo ""

echo -e "${GREEN}Happy coding! 🚀${NC}"
