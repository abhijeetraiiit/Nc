# 🔧 Common Error Fixes

**Quick reference for fixing common errors when setting up the Nc e-commerce platform.**

---

## 📋 Table of Contents

- [Database Errors](#database-errors)
  - [DATABASE_URL not found](#1-database_url-not-found)
  - [Cannot connect to PostgreSQL](#2-cannot-connect-to-postgresql)
  - [MongoDB connection refused](#3-mongodb-connection-refused)
  - [Migration failed](#4-migration-failed)
  - [Database doesn't exist](#5-database-doesnt-exist)
  - [Prisma Client not generated](#6-prisma-client-not-generated)
- [Installation Errors](#installation-errors)
  - [npm: command not found](#7-npm-command-not-found)
  - [node: command not found](#8-node-command-not-found)
  - [docker: command not found](#9-docker-command-not-found)
  - [Permission denied](#10-permission-denied)
- [Runtime Errors](#runtime-errors)
  - [Port already in use](#11-port-already-in-use)
  - [EADDRINUSE error](#12-eaddrinuse-error)
  - [Module not found](#13-module-not-found)
  - [TypeScript compilation errors](#14-typescript-compilation-errors)
  - [turbo: command not found](#15-turbo-command-not-found)

---

## Database Errors

### 1. DATABASE_URL not found

**Error:**
```
Error: Environment variable not found: DATABASE_URL.
  --> prisma\schema.prisma:11
Error code: P1012
```

**What it means:**
Prisma cannot find the DATABASE_URL environment variable which tells it how to connect to your database.

**Why it happens:**
The `.env` file doesn't exist or doesn't have the DATABASE_URL variable.

**Quick Fix:**
```bash
# Copy the example environment file
cp .env.example .env

# Now try again
cd packages/database
npx prisma migrate dev --name init
```

**Automated Fix:**
```bash
./setup-env.sh
```

**Prevention:**
Always create a `.env` file from `.env.example` before running database commands.

---

### 2. Cannot connect to PostgreSQL

**Error:**
```
Error: P1001: Can't reach database server at `localhost:5432`
```

**What it means:**
PostgreSQL database server is not running.

**Quick Fix:**
```bash
# Start PostgreSQL using Docker
docker-compose up -d postgres

# Verify it's running
docker ps | grep postgres
```

**Check if Docker Desktop is running** (Windows/Mac)

**Prevention:**
Always start databases before running migrations.

---

### 3. MongoDB connection refused

**Error:**
```
MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
```

**What it means:**
MongoDB server is not running.

**Quick Fix:**
```bash
# Start MongoDB using Docker
docker-compose up -d mongodb

# Verify it's running
docker ps | grep mongodb
```

**Prevention:**
Use `docker-compose up -d` to start all databases.

---

### 4. Migration failed

**Error:**
```
Error: P3006: Migration `20240211_init` failed to apply cleanly to the shadow database.
```

**What it means:**
There's a problem with the database schema or previous migrations.

**Quick Fix:**
```bash
# Reset the database (WARNING: deletes all data)
cd packages/database
npx prisma migrate reset

# Then try again
npx prisma migrate dev --name init
```

**For production:** Never use reset! Fix migrations manually.

---

### 5. Database doesn't exist

**Error:**
```
Error: P1003: Database `nc_ecommerce` does not exist
```

**What it means:**
The database specified in DATABASE_URL hasn't been created yet.

**Quick Fix:**
```bash
# Create the database
docker exec -it nc-postgres psql -U nc_user -c "CREATE DATABASE nc_ecommerce;"

# Or let Prisma create it
cd packages/database
npx prisma migrate dev --name init --create-only
```

**Prevention:**
Use `npx prisma migrate dev` which creates the database automatically.

---

### 6. Prisma Client not generated

**Error:**
```
Error: @prisma/client did not initialize yet
```

**What it means:**
The Prisma Client hasn't been generated from your schema.

**Quick Fix:**
```bash
cd packages/database
npx prisma generate
```

**Prevention:**
Run `npx prisma generate` after every schema change.

---

## Installation Errors

### 7. npm: command not found

**Error:**
```
bash: npm: command not found
```

**What it means:**
Node.js/npm is not installed on your system.

**Quick Fix:**

**Windows:**
1. Download from https://nodejs.org/
2. Install the LTS version
3. Restart your terminal

**Mac:**
```bash
brew install node
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify:**
```bash
node --version
npm --version
```

---

### 8. node: command not found

**Error:**
```
bash: node: command not found
```

**Quick Fix:**
Same as [npm: command not found](#7-npm-command-not-found)

---

### 9. docker: command not found

**Error:**
```
bash: docker: command not found
```

**What it means:**
Docker is not installed.

**Quick Fix:**

**Windows/Mac:**
1. Download Docker Desktop: https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**Verify:**
```bash
docker --version
docker-compose --version
```

---

### 10. Permission denied

**Error:**
```
Error: EACCES: permission denied
```

**What it means:**
You don't have permission to run the command.

**Quick Fix:**

**For npm global installs:**
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

**For Docker:**
```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER
newgrp docker
```

**For files:**
```bash
# Make script executable
chmod +x setup.sh
```

---

## Runtime Errors

### 11. Port already in use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**What it means:**
Another application is using port 3000.

**Quick Fix:**

**Find what's using the port:**
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

**Kill the process:**
```bash
# Windows (replace PID with actual process ID)
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

**Or use a different port:**
```bash
# Set in .env
WEB_APP_PORT=3001
```

---

### 12. EADDRINUSE error

**Error:**
```
Error: bind EADDRINUSE null:3000
```

**Quick Fix:**
Same as [Port already in use](#11-port-already-in-use)

---

### 13. Module not found

**Error:**
```
Error: Cannot find module '@nc/ui'
```

**What it means:**
Dependencies haven't been installed.

**Quick Fix:**
```bash
# Install all dependencies
npm install

# If still failing, clean install
rm -rf node_modules package-lock.json
npm install
```

**For workspace modules:**
```bash
# Build the package
cd packages/ui
npm run build
```

---

### 14. TypeScript compilation errors

**Error:**
```
error TS2307: Cannot find module '@nc/shared'
```

**What it means:**
TypeScript can't find the module or it hasn't been built.

**Quick Fix:**
```bash
# Build all packages
npm run build

# Or build specific package
cd packages/shared
npm run build
```

**Generate TypeScript definitions:**
```bash
cd packages/database
npx prisma generate
```

---

### 15. turbo: command not found

**Error:**
```
sh: 1: turbo: not found
```

**What it means:**
Dependencies haven't been installed or turbo isn't in node_modules.

**Quick Fix:**
```bash
# Install dependencies
npm install

# Verify turbo is installed
npx turbo --version
```

**If using npm run dev:**
```bash
# This uses the pre-flight check
npm run dev

# Or bypass checks
npm run dev:direct
```

---

## 🆘 Still Need Help?

If your error isn't listed here:

1. **Check TROUBLESHOOTING.md** - More detailed troubleshooting
2. **Check COMPLETE-BEGINNER-GUIDE.md** - Step-by-step setup
3. **Search the docs** - docs/ folder has detailed guides
4. **Check GitHub Issues** - Someone may have had the same problem
5. **Ask for help** - Create a new issue with:
   - The exact error message
   - What you were trying to do
   - Your OS (Windows/Mac/Linux)
   - Output of `node --version` and `npm --version`

---

## 📚 Related Documentation

- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - General troubleshooting
- [COMPLETE-BEGINNER-GUIDE.md](./COMPLETE-BEGINNER-GUIDE.md) - Beginner's setup guide
- [MANUAL-STEPS.md](./MANUAL-STEPS.md) - Manual setup steps
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide

---

**Most errors are configuration issues that are easy to fix!** Don't give up! 💪
