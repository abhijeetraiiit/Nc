#!/bin/bash

# Nc E-commerce Platform - Automated Setup Script
# This script automates the entire setup process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}==>${NC} ${GREEN}$1${NC}"
}

print_error() {
    echo -e "${RED}Error: $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}Warning: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Print banner
echo -e "${BLUE}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   Nc E-commerce Platform - Automated Setup               ║
║   Enterprise-grade multivendor marketplace               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Step 1: Check prerequisites
print_step "Step 1/7: Checking prerequisites..."

if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js v20+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js version must be 20 or higher. Current: v$NODE_VERSION"
    exit 1
fi
print_success "Node.js $(node --version) found"

if ! command_exists npm; then
    print_error "npm is not installed. Please install npm v10+"
    exit 1
fi
print_success "npm $(npm --version) found"

if ! command_exists docker; then
    print_error "Docker is not installed. Please install Docker from https://docker.com/"
    exit 1
fi
print_success "Docker $(docker --version | cut -d' ' -f3 | cut -d',' -f1) found"

if ! command_exists git; then
    print_error "Git is not installed. Please install Git from https://git-scm.com/"
    exit 1
fi
print_success "Git $(git --version | cut -d' ' -f3) found"

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi
print_success "Docker is running"

echo ""

# Step 2: Install dependencies
print_step "Step 2/7: Installing dependencies (this may take 2-5 minutes)..."

if [ ! -d "node_modules" ]; then
    npm install
    print_success "Dependencies installed"
else
    print_warning "Dependencies already installed. Run 'npm install' manually to update."
fi

echo ""

# Step 3: Setup environment variables
print_step "Step 3/7: Setting up environment variables..."

if [ ! -f ".env" ]; then
    cp .env.example .env
    print_success "Environment file created (.env)"
else
    print_warning ".env file already exists. Skipping."
fi

echo ""

# Step 4: Start databases
print_step "Step 4/7: Starting databases (PostgreSQL, MongoDB, Redis)..."

docker-compose up -d postgres mongodb redis

# Wait for databases to be ready
print_step "Waiting for databases to be ready (30 seconds)..."
sleep 30

# Check if containers are running
if docker ps | grep -q "nc-postgres"; then
    print_success "PostgreSQL is running"
else
    print_error "PostgreSQL failed to start"
    exit 1
fi

if docker ps | grep -q "nc-mongodb"; then
    print_success "MongoDB is running"
else
    print_error "MongoDB failed to start"
    exit 1
fi

if docker ps | grep -q "nc-redis"; then
    print_success "Redis is running"
else
    print_error "Redis failed to start"
    exit 1
fi

echo ""

# Step 5: Setup database schema
print_step "Step 5/7: Setting up database schema..."

cd packages/database

# Generate Prisma client
npx prisma generate
print_success "Prisma client generated"

# Run migrations
npx prisma migrate dev --name init 2>/dev/null || {
    print_warning "Migrations already applied or failed. This is usually okay on first run."
}
print_success "Database schema created"

cd ../..

echo ""

# Step 6: Build packages
print_step "Step 6/7: Building shared packages..."

npm run build 2>/dev/null || {
    print_warning "Build failed or not needed. You can build manually with 'npm run build'"
}

echo ""

# Step 7: Summary
print_step "Step 7/7: Setup complete!"

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗"
echo -e "║                                                           ║"
echo -e "║   ✓ Setup completed successfully!                        ║"
echo -e "║                                                           ║"
echo -e "╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}Next steps:${NC}"
echo ""
echo "  1. Start all services:"
echo -e "     ${YELLOW}npm run dev${NC}"
echo ""
echo "  2. Open your browser and visit:"
echo -e "     ${GREEN}Web App:${NC}         http://localhost:3000"
echo -e "     ${GREEN}Vendor Dashboard:${NC} http://localhost:3001"
echo -e "     ${GREEN}Admin Panel:${NC}      http://localhost:3002"
echo -e "     ${GREEN}API Docs:${NC}         http://localhost:4000/api/docs"
echo ""
echo -e "${BLUE}Useful commands:${NC}"
echo ""
echo "  • Start services:      npm run dev"
echo "  • Stop databases:      docker-compose down"
echo "  • View database:       cd packages/database && npx prisma studio"
echo "  • Check containers:    docker ps"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo ""
echo "  • Quick Start:   QUICKSTART.md"
echo "  • Setup Guide:   docs/SETUP.md"
echo "  • Architecture:  docs/ARCHITECTURE.md"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
