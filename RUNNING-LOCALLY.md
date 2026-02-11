# 🚀 Running Nc Locally - Quick Guide

> [!WARNING]
> **Important**: Clone the `copilot/create-ecommerce-monorepo` branch, not `main`!
> See [CLONE-INSTRUCTIONS.md](./CLONE-INSTRUCTIONS.md) for details.

**3 Simple Steps to Get Started**

---

## Option 1: Quick Start (Recommended)

```bash
# 1. Clone the repository (CORRECT BRANCH!)
git clone -b copilot/create-ecommerce-monorepo https://github.com/abhijeetraiiit/Nc.git
cd Nc

# 2. Install dependencies
npm install

# 3. Start development servers
npm run dev
```

**That's it!** Visit:
- 🌐 Web App: http://localhost:3000
- 👔 Vendor Dashboard: http://localhost:3001
- 🔧 Admin Panel: http://localhost:3002

---

## Option 2: Automated Setup (With Databases)

### For Linux/Mac:
```bash
./setup.sh
```

### For Windows:
```cmd
setup.bat
```

This will:
- ✅ Check prerequisites
- ✅ Install dependencies
- ✅ Start Docker databases (PostgreSQL, MongoDB, Redis)
- ✅ Run migrations
- ✅ Start all services

---

## Option 3: Step-by-Step Manual Setup

### Prerequisites

Make sure you have:
- Node.js 18+ ([download](https://nodejs.org/))
- npm 9+ (comes with Node.js)
- Docker Desktop ([download](https://www.docker.com/products/docker-desktop)) - *optional, for databases*

### Steps

```bash
# 1. Clone
git clone https://github.com/abhijeetraiiit/Nc.git
cd Nc

# 2. Install dependencies
npm install

# 3. (Optional) Start databases
docker-compose up -d postgres mongodb redis

# 4. (Optional) Run database migrations
cd packages/database
npx prisma generate
npx prisma migrate dev
cd ../..

# 5. Start development servers
npm run dev
```

---

## 🎯 What Gets Started

When you run `npm run dev`, you get:

| App | URL | Description |
|-----|-----|-------------|
| **Web** | http://localhost:3000 | Customer-facing store |
| **Vendor Dashboard** | http://localhost:3001 | Vendor management |
| **Admin Panel** | http://localhost:3002 | Platform administration |
| **API Gateway** | http://localhost:4000 | Backend API |

---

## 🔧 Common Issues

### "npm run dev not working"

**Problem:** `sh: turbo: not found`

**Solution:** Run `npm install` first!

```bash
npm install
npm run dev
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:** Stop the process using that port or use different ports:

```bash
# Find what's using port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Or run individual apps on different ports
cd apps/web && npm run dev  # Still uses 3000
```

### Docker Not Running

**Problem:** `Cannot connect to the Docker daemon`

**Solution:** Start Docker Desktop, then:

```bash
docker-compose up -d postgres mongodb redis
```

---

## 📚 More Help

- **First time setup:** See [QUICKSTART.md](./QUICKSTART.md)
- **Troubleshooting:** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Cloud deployment:** See [ONLINE-DEPLOYMENT.md](./ONLINE-DEPLOYMENT.md)
- **Architecture:** See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

---

## ⚡ TL;DR

```bash
git clone https://github.com/abhijeetraiiit/Nc.git && cd Nc && npm install && npm run dev
```

Then open http://localhost:3000 🎉
