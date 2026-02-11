# 🚀 Getting Started with Nc E-commerce Platform

**Complete Step-by-Step Guide for Beginners**

> [!IMPORTANT]
> **⚠️ MUST READ FIRST**: You need to clone the `copilot/create-ecommerce-monorepo` branch!
> The `main` branch only has README. See [CLONE-INSTRUCTIONS.md](./CLONE-INSTRUCTIONS.md).

This guide will walk you through setting up the Nc e-commerce platform on your local machine, from zero to running application in about 15 minutes.

---

## 📋 What You'll Need

Before starting, make sure you have these installed on your computer:

### Required Software

1. **Node.js** (v20 or higher)
   - Download: https://nodejs.org/
   - Check if installed: `node --version`
   - Should show: `v20.x.x` or higher

2. **npm** (v10 or higher) 
   - Comes with Node.js
   - Check if installed: `npm --version`
   - Should show: `10.x.x` or higher

3. **Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop
   - Check if installed: `docker --version`
   - Should show: `Docker version 24.x.x` or higher

4. **Git**
   - Download: https://git-scm.com/downloads
   - Check if installed: `git --version`
   - Should show: `git version 2.x.x` or higher

---

## 🎯 Step-by-Step Setup

### Step 1: Get the Code

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
# Navigate to where you want to store the project
cd ~/Documents  # or any folder you prefer

# Clone the repository (IMPORTANT: Use the PR branch!)
git clone -b copilot/create-ecommerce-monorepo https://github.com/abhijeetraiiit/Nc.git

# Enter the project folder
cd Nc
```

**What this does:** Downloads all the project files to your computer from the correct branch.

**Why `-b copilot/create-ecommerce-monorepo`?** The full platform is on this branch. The `main` branch only has README.

---

### Step 2: Install Project Dependencies

Still in your terminal, run:

```bash
npm install
```

**What this does:** 
- Downloads all required packages and libraries
- Sets up the monorepo structure
- Prepares all apps and services

**Time:** 2-5 minutes depending on your internet speed

**Expected output:** You'll see a progress bar and lots of package names. Wait for it to complete.

---

### Step 3: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

**What this does:** Creates a `.env` file with all necessary configuration.

**For beginners:** The default values in `.env` are fine for local development. You don't need to change anything yet!

**Optional:** If you want to customize, open `.env` in any text editor and modify values.

---

### Step 4: Start the Databases

Make sure Docker Desktop is running, then:

```bash
# Start PostgreSQL, MongoDB, and Redis
docker-compose up -d postgres mongodb redis
```

**What this does:** Starts three database containers:
- **PostgreSQL** (port 5432) - For user data, orders, payments
- **MongoDB** (port 27017) - For product catalog
- **Redis** (port 6379) - For caching and sessions

**Time:** 1-2 minutes

**Check if running:**
```bash
docker ps
```

You should see 3 containers running: `nc-postgres`, `nc-mongodb`, `nc-redis`

---

### Step 5: Setup the Database Schema

```bash
# Navigate to database package
cd packages/database

# Generate Prisma client
npx prisma generate

# Run database migrations (creates tables)
npx prisma migrate dev --name init

# Go back to project root
cd ../..
```

**What this does:** 
- Creates all database tables in PostgreSQL
- Sets up the schema for users, vendors, orders, etc.

**Expected output:** You'll see a list of migrations being applied. This is normal!

---

### Step 6: Start All Applications

```bash
npm run dev
```

**What this does:** Starts all applications and services:
- Web app (customer-facing)
- Vendor dashboard
- Admin panel
- API Gateway
- All 6 microservices

**Time:** 30-60 seconds to start everything

**Expected output:** You'll see lots of output showing each service starting. Look for:
```
🚀 API Gateway running on: http://localhost:4000
🚀 vendor-service running on: http://localhost:4001
...
```

---

### Step 7: Access the Applications

Once everything is running, open these URLs in your browser:

#### 🌐 **Main Web App** (Customer-facing e-commerce)
```
http://localhost:3000
```
- This is what customers see
- Features Bento Grid layout
- Neubrutalism design

#### 👔 **Vendor Dashboard** (For sellers)
```
http://localhost:3001
```
- Dark mode interface
- Inventory management
- Trust Score display

#### 🔧 **Admin Panel** (Platform management)
```
http://localhost:3002
```
- Vendor approvals
- Compliance monitoring
- Platform analytics

#### 🔌 **API Documentation** (Interactive API docs)
```
http://localhost:4000/api/docs
```
- Swagger UI
- Test API endpoints
- See all available APIs

---

## ✅ Verify Everything Works

### Test 1: Check Web App
1. Go to http://localhost:3000
2. You should see:
   - Black header with "Nc" logo
   - Hero section with "Shop Like Never Before"
   - Bento Grid category section
   - Trending products

### Test 2: Check API
1. Go to http://localhost:4000/api/docs
2. Click on any endpoint (e.g., GET /)
3. Click "Try it out" → "Execute"
4. You should see a successful response

### Test 3: Check Databases
```bash
# Check PostgreSQL
docker exec -it nc-postgres psql -U nc_user -d nc_ecommerce -c "\dt"

# Should show list of tables: users, vendors, orders, etc.
```

---

## 🛑 Common Issues & Solutions

### Issue 1: "Port already in use"
**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find what's using the port
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or change the port in the app
```

### Issue 2: "Docker is not running"
**Error:** `Cannot connect to Docker daemon`

**Solution:**
- Open Docker Desktop application
- Wait for it to fully start (icon stops animating)
- Try the command again

### Issue 3: "npm install fails"
**Error:** Various npm errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
rm -rf node_modules
npm install
```

### Issue 4: "Database migration fails"
**Error:** `Can't reach database server`

**Solution:**
```bash
# Make sure databases are running
docker-compose up -d postgres mongodb redis

# Wait 30 seconds for databases to fully start
sleep 30

# Try migration again
cd packages/database
npx prisma migrate dev
```

---

## 🎓 Next Steps

Now that everything is running, you can:

### 1. **Explore the Code**
```bash
# Frontend apps
apps/web/               # Main e-commerce site
apps/vendor-dashboard/  # Vendor portal
apps/admin/             # Admin panel

# Backend services
services/api-gateway/   # Main API
services/product-service/  # Product management
services/order-service/    # Order processing

# Shared code
packages/ui/            # UI components
packages/design-system/ # Neubrutalism theme
```

### 2. **Read the Documentation**
- `docs/ARCHITECTURE.md` - How everything fits together
- `docs/COMPLIANCE.md` - Indian regulations explained
- `docs/API.md` - API endpoints reference
- `docs/CONTRIBUTING.md` - How to contribute code

### 3. **Make Your First Change**

Try editing the homepage:
```bash
# Open the file in your editor
code apps/web/src/app/page.tsx

# Change line 45:
# From: "Shop Like Never Before"
# To:   "Welcome to Nc E-commerce"

# Save the file
# The browser will automatically reload with your changes!
```

### 4. **Test the API**

Try creating a user:
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "name": "Test User"
  }'
```

---

## 🔄 Daily Development Workflow

### Starting Work
```bash
# 1. Start databases (if not already running)
docker-compose up -d postgres mongodb redis

# 2. Start all services
npm run dev
```

### Stopping Work
```bash
# Stop development servers
# Press Ctrl+C in the terminal where npm run dev is running

# Stop databases (optional - they can keep running)
docker-compose down
```

### Updating Code
```bash
# Pull latest changes
git pull

# Install any new dependencies
npm install

# Restart services
npm run dev
```

---

## 📊 Understanding the Architecture

```
┌─────────────────────────────────────────────┐
│          FRONTEND (Browser)                  │
│  Web App (3000) | Vendor (3001) | Admin (3002)│
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│        API Gateway (4000)                    │
│  • Authentication (JWT)                      │
│  • Rate Limiting                             │
│  • Request Routing                           │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
    ┌────────┐ ┌────────┐ ┌────────┐
    │Vendor  │ │Product │ │Order   │
    │Service │ │Service │ │Service │
    │(4001)  │ │(4002)  │ │(4003)  │
    └────────┘ └────────┘ └────────┘
        │         │         │
        └─────────┼─────────┘
                  ↓
┌─────────────────────────────────────────────┐
│          DATABASES                           │
│  PostgreSQL (5432) | MongoDB (27017) | Redis│
└─────────────────────────────────────────────┘
```

---

## 🎨 Understanding Neubrutalism Design

The platform uses a bold, modern design style called "Neubrutalism":

**Key Features:**
- **Bold borders** (4px thick, black)
- **Offset shadows** (8px 8px, black)
- **High contrast** (black text on white background)
- **Vibrant accents** (hot pink #FF3366, mint green #00FF88)

**Example in code:**
```css
/* Brutal button style */
.brutal-button {
  border: 4px solid #000000;
  box-shadow: 8px 8px 0px #000000;
  font-weight: 900;
}
```

---

## 💡 Tips for Success

1. **Keep Docker Desktop running** - The databases need it
2. **Use Ctrl+C to stop servers** - Don't close the terminal window directly
3. **Check browser console** - F12 to see any frontend errors
4. **Use the API docs** - http://localhost:4000/api/docs is your friend
5. **Read error messages** - They usually tell you exactly what's wrong

---

## 📞 Getting Help

### Documentation
- Main README: `/README.md`
- Architecture: `/docs/ARCHITECTURE.md`
- Setup Guide: `/docs/SETUP.md`
- API Reference: `/docs/API.md`

### Common Commands Reference
```bash
# Install dependencies
npm install

# Start all services
npm run dev

# Start just the web app
cd apps/web && npm run dev

# Start databases
docker-compose up -d postgres mongodb redis

# Stop databases
docker-compose down

# View database in GUI
cd packages/database && npx prisma studio

# Check running containers
docker ps

# View service logs
docker logs nc-postgres
docker logs nc-mongodb
docker logs nc-redis
```

### Community
- **GitHub Issues:** https://github.com/abhijeetraiiit/Nc/issues
- **Discussions:** https://github.com/abhijeetraiiit/Nc/discussions

---

## 🎉 Congratulations!

You now have a fully functional enterprise e-commerce platform running locally!

**What you can do next:**
- Explore the codebase
- Make changes and see them live
- Read the architecture documentation
- Start building new features
- Contribute to the project

**Happy coding! 🚀**

---

*Last updated: February 2026*
*Platform version: 1.0.0*
