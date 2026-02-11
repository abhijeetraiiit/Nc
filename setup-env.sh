#!/bin/bash

# setup-env.sh
# Creates .env file from .env.example if it doesn't exist
# Validates that DATABASE_URL is configured

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "🔍 Checking environment setup..."
echo ""

# Check if .env.example exists
echo "Checking for .env.example..."
if [ ! -f ".env.example" ]; then
    echo -e "${RED}✗ .env.example not found${NC}"
    echo ""
    echo "The .env.example file is missing from the repository."
    echo "This is required to create your .env file."
    exit 1
fi
echo -e "${GREEN}✓ .env.example found${NC}"

# Check if .env already exists
echo ""
echo "Checking for .env file..."
if [ -f ".env" ]; then
    echo -e "${YELLOW}✓ .env file already exists${NC}"
    echo ""
    echo "Your .env file is already configured."
    echo "If you want to reset it, delete .env and run this script again."
    echo ""
    
    # Check if DATABASE_URL is set
    if grep -q "^DATABASE_URL=" ".env"; then
        echo -e "${GREEN}✓ DATABASE_URL is configured${NC}"
    else
        echo -e "${RED}✗ DATABASE_URL not found in .env${NC}"
        echo ""
        echo "Please add DATABASE_URL to your .env file."
        echo "You can copy it from .env.example:"
        echo ""
        echo "DATABASE_URL=\"postgresql://nc_user:nc_password@localhost:5432/nc_ecommerce\""
        exit 1
    fi
    
    echo ""
    echo -e "${GREEN}✅ Environment setup is complete!${NC}"
    exit 0
fi

echo -e "${YELLOW}✗ .env file not found${NC}"
echo ""

# Create .env from .env.example
echo "Creating .env file from .env.example..."
cp .env.example .env

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ .env file created successfully!${NC}"
else
    echo -e "${RED}✗ Failed to create .env file${NC}"
    exit 1
fi

echo ""

# Validate DATABASE_URL exists
echo "Validating DATABASE_URL..."
if grep -q "^DATABASE_URL=" ".env"; then
    echo -e "${GREEN}✓ DATABASE_URL is configured correctly${NC}"
else
    echo -e "${RED}✗ DATABASE_URL not found in .env${NC}"
    echo ""
    echo "Something went wrong. Please check your .env.example file."
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Environment setup complete!${NC}"
echo ""
echo "Your .env file has been created with default values."
echo ""
echo -e "${BLUE}You can now run:${NC}"
echo "  cd packages/database"
echo "  npx prisma migrate dev --name init"
echo ""
echo -e "${YELLOW}Note:${NC} The default DATABASE_URL is configured for local development."
echo "      For production, update the values in .env"
echo ""
