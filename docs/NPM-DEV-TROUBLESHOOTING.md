# npm run dev - Common Issues and Solutions

This guide helps you troubleshoot `npm run dev` issues.

## Quick Fix (90% of cases)

If you get any error when running `npm run dev`, try this first:

```bash
# Install dependencies
npm install

# Then run dev
npm run dev
```

---

## Common Errors and Solutions

### 1. ❌ "turbo: not found" or "command not found"

**Error:**
```
sh: 1: turbo: not found
```

**Cause:** Dependencies are not installed.

**Solution:**
```bash
npm install
```

**Why it happens:** The `turbo` command is a development dependency that needs to be installed before you can use it.

---

### 2. ❌ "ENOENT: no such file or directory"

**Error:**
```
ENOENT: no such file or directory, open 'package.json'
```

**Cause:** You're not in the project root directory.

**Solution:**
```bash
# Navigate to the project root
cd /path/to/Nc

# Then run
npm run dev
```

---

### 3. ❌ Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Cause:** Another application is using port 3000, 3001, 3002, or 4000.

**Solution:**

**Option A - Kill the process:**
```bash
# Find what's using the port
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows (then use Task Manager)

# Or kill all Node processes
pkill -f node  # Mac/Linux
taskkill /F /IM node.exe  # Windows
```

**Option B - Change the port:**
```bash
# Create .env.local in apps/web/
PORT=3003 npm run dev
```

---

### 4. ❌ Module Not Found Errors

**Error:**
```
Error: Cannot find module '@nc/ui'
Error: Cannot find module 'next'
```

**Cause:** Dependencies are missing or corrupted.

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Or use the setup script
./setup.sh  # Linux/Mac
setup.bat   # Windows
```

---

### 5. ❌ TypeScript Errors on Startup

**Error:**
```
Type error: Cannot find name 'React'
```

**Cause:** TypeScript compilation errors in the code.

**Solution:**

**Option A - Continue anyway (dev mode allows errors):**
```bash
# Dev mode should still work despite TypeScript errors
npm run dev
```

**Option B - Fix the errors:**
```bash
# Check what's wrong
npm run type-check

# Fix the reported errors
```

---

### 6. ❌ "npm" Not Found

**Error:**
```
bash: npm: command not found
```

**Cause:** Node.js is not installed.

**Solution:**

1. Install Node.js from https://nodejs.org/
2. Verify installation:
   ```bash
   node --version  # Should show v18 or higher
   npm --version   # Should show v9 or higher
   ```
3. Try again:
   ```bash
   npm install
   npm run dev
   ```

---

### 7. ❌ Permission Errors

**Error:**
```
EACCES: permission denied
```

**Cause:** Insufficient permissions.

**Solution:**

```bash
# DON'T use sudo npm install (bad practice)

# Instead, fix npm permissions:
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Then try again
npm install
npm run dev
```

---

### 8. ❌ Network/Registry Errors

**Error:**
```
ETIMEDOUT: connect ETIMEDOUT
ENOTFOUND: getaddrinfo ENOTFOUND registry.npmjs.org
```

**Cause:** Network issues or firewall blocking npm registry.

**Solution:**

```bash
# Check your internet connection

# Try clearing npm cache
npm cache clean --force

# Try with different registry
npm install --registry=https://registry.npmjs.org/

# Or use offline mode if you have cached packages
npm install --prefer-offline
```

---

### 9. ❌ Out of Memory

**Error:**
```
FATAL ERROR: Ineffective mark-compacts near heap limit
JavaScript heap out of memory
```

**Cause:** Node.js ran out of memory during build.

**Solution:**

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev

# Or add to package.json scripts:
"dev": "node --max-old-space-size=4096 scripts/dev-with-check.js"
```

---

### 10. ❌ Database Connection Errors (when dev starts)

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Cause:** Databases are not running.

**Solution:**

```bash
# Start databases with Docker
docker-compose up -d postgres mongodb redis

# Verify they're running
docker-compose ps

# Then run dev
npm run dev
```

---

## Step-by-Step First-Time Setup

If nothing works, start from scratch:

```bash
# 1. Ensure you have Node.js 18+ and npm 9+
node --version
npm --version

# 2. Clone the repository (if not already done)
git clone https://github.com/abhijeetraiiit/Nc.git
cd Nc

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env

# 5. Start databases
docker-compose up -d postgres mongodb redis

# 6. Run database migrations
cd packages/database
npx prisma generate
npx prisma migrate dev
cd ../..

# 7. Start development servers
npm run dev
```

---

## Using the Automated Setup

The easiest way is to use our setup scripts:

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```cmd
setup.bat
```

These scripts check prerequisites, install dependencies, start databases, and run migrations automatically.

---

## Still Having Issues?

### Check System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher  
- **Docker**: 20.10 or higher (for databases)
- **RAM**: At least 4GB available
- **Disk Space**: At least 2GB free

### Run Diagnostics

```bash
# Check Node and npm versions
node --version
npm --version

# Check if dependencies are installed
npm run check-install

# Check for port conflicts
lsof -i :3000,3001,3002,4000  # Mac/Linux
netstat -ano | findstr "3000 3001 3002 4000"  # Windows

# Check Docker status
docker-compose ps

# Check available disk space
df -h .  # Mac/Linux
dir     # Windows
```

### Get Help

1. **Check full documentation:**
   - [QUICKSTART.md](./QUICKSTART.md) - Step-by-step beginner guide
   - [SETUP.md](./docs/SETUP.md) - Detailed setup guide
   - [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - General troubleshooting

2. **Search for similar issues:**
   - Check [GitHub Issues](https://github.com/abhijeetraiiit/Nc/issues)

3. **Create a new issue:**
   - Include the error message
   - Include output of `node --version` and `npm --version`
   - Include your operating system
   - Include steps you've already tried

---

## Pro Tips

✅ **Always run `npm install` after pulling new code**

✅ **Use the automated setup scripts for the best experience**

✅ **Keep Node.js and npm updated**

✅ **Close other applications to free up ports**

✅ **Use the check command before dev:**
```bash
npm run check-install
npm run dev
```

✅ **Watch for helpful error messages** - The new dev script provides clear guidance

---

## Quick Commands Reference

```bash
# Check if ready to run
npm run check-install

# Run development servers (with checks)
npm run dev

# Run without checks (if you know dependencies are installed)
npm run dev:direct

# Clean and reinstall
npm run clean
npm install

# Update dependencies
npm update

# Check for issues
npm run type-check
npm run lint
```

---

**Remember:** Most issues are solved by running `npm install` first! 🚀
