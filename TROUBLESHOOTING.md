# 🔧 Troubleshooting Guide

Common issues and their solutions when setting up the Nc e-commerce platform.

---

## 🚨 Quick Diagnostics

Run this command to check your system:

```bash
# Check all prerequisites
node --version && npm --version && docker --version && git --version
```

Expected output:
```
v20.x.x
10.x.x
Docker version 24.x.x
git version 2.x.x
```

---

## Common Issues

### 1. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Cause:** Another application is using the same port.

**Solution:**

**Option A: Find and kill the process**

Linux/Mac:
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 <PID>
```

Windows:
```cmd
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Option B: Change the port**

Edit `apps/web/package.json`:
```json
"scripts": {
  "dev": "next dev --port 3001"
}
```

---

### 2. Docker Not Running

**Error:**
```
Cannot connect to the Docker daemon
Error: connect ECONNREFUSED
```

**Cause:** Docker Desktop is not running.

**Solution:**

1. **Open Docker Desktop application**
2. **Wait for it to fully start** (icon in taskbar stops animating)
3. **Verify it's running:**
   ```bash
   docker ps
   ```
4. **Try your command again**

**Still not working?**
- Restart Docker Desktop
- Check if virtualization is enabled in BIOS (Windows/Linux)
- On Windows, ensure WSL2 is installed

---

### 3. npm install Fails

**Error:**
```
npm ERR! code EINTEGRITY
npm ERR! Verification failed
```

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try again
npm install
```

**Still failing?**

```bash
# Use legacy peer deps
npm install --legacy-peer-deps
```

---

### 4. Database Connection Failed

**Error:**
```
Can't reach database server at localhost:5432
```

**Cause:** Database containers not running or not ready.

**Solution:**

1. **Check if containers are running:**
   ```bash
   docker ps
   ```
   You should see `nc-postgres`, `nc-mongodb`, `nc-redis`

2. **If not running, start them:**
   ```bash
   docker-compose up -d postgres mongodb redis
   ```

3. **Wait 30 seconds for databases to fully initialize:**
   ```bash
   sleep 30  # Linux/Mac
   timeout /t 30  # Windows
   ```

4. **Check container logs:**
   ```bash
   docker logs nc-postgres
   docker logs nc-mongodb
   docker logs nc-redis
   ```

5. **Try migration again:**
   ```bash
   cd packages/database
   npx prisma migrate dev
   ```

---

### 5. Prisma Migration Fails

**Error:**
```
P1001: Can't reach database server
P1002: The database server was reached but timed out
```

**Solution:**

**Step 1: Verify DATABASE_URL in .env**
```env
DATABASE_URL="postgresql://nc_user:nc_password@localhost:5432/nc_ecommerce"
```

**Step 2: Test database connection**
```bash
docker exec -it nc-postgres psql -U nc_user -d nc_ecommerce -c "SELECT 1;"
```

Should return:
```
 ?column? 
----------
        1
```

**Step 3: Reset and retry**
```bash
cd packages/database

# Reset Prisma
npx prisma migrate reset

# Generate client
npx prisma generate

# Run migration
npx prisma migrate dev --name init
```

---

### 6. "Module not found" Errors

**Error:**
```
Error: Cannot find module '@nc/ui'
Error: Cannot find module '@nc/shared'
```

**Cause:** Shared packages not built or linked.

**Solution:**

```bash
# Build all packages
npm run build

# If still failing, clean and rebuild
npm run clean
npm install
npm run build
```

---

### 7. Turbo Cache Issues

**Error:**
```
Tasks failed in turbo cache
```

**Solution:**

```bash
# Clear Turbo cache
rm -rf .turbo

# Rebuild
npm run build
```

---

### 8. Next.js Build Errors

**Error:**
```
Error: Failed to compile
Type error: Cannot find module
```

**Solution:**

```bash
# Clean Next.js cache
rm -rf apps/web/.next
rm -rf apps/vendor-dashboard/.next
rm -rf apps/admin/.next

# Rebuild
npm run dev
```

---

### 9. ESLint Errors

**Error:**
```
ESLint: Failed to load config
```

**Solution:**

```bash
# Reinstall ESLint dependencies
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Or skip linting temporarily
npm run dev -- --no-lint
```

---

### 10. Memory/Performance Issues

**Error:**
```
JavaScript heap out of memory
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Solution:**

**Increase Node.js memory:**

```bash
# Linux/Mac (in .bashrc or .zshrc)
export NODE_OPTIONS="--max-old-space-size=4096"

# Windows (in PowerShell)
$env:NODE_OPTIONS="--max-old-space-size=4096"

# Or run with flag
node --max-old-space-size=4096 node_modules/.bin/next dev
```

**Reduce concurrent builds:**

Edit `turbo.json`:
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    }
  },
  "globalEnv": ["NODE_ENV"],
  "globalPassThroughEnv": ["NODE_OPTIONS"]
}
```

---

### 11. Docker Compose Errors

**Error:**
```
ERROR: Version in "./docker-compose.yml" is unsupported
```

**Solution:**

Update Docker Compose to v2.x:

```bash
# Check version
docker-compose --version

# If < 2.0, update Docker Desktop
# Or use docker compose (without hyphen)
docker compose up -d postgres mongodb redis
```

---

### 12. Permission Denied Errors (Linux/Mac)

**Error:**
```
EACCES: permission denied
```

**Solution:**

```bash
# Fix node_modules permissions
sudo chown -R $(whoami) node_modules

# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Make setup script executable
chmod +x setup.sh
```

---

### 13. Windows Line Ending Issues

**Error:**
```
'/bin/bash^M: bad interpreter'
```

**Cause:** Windows line endings (CRLF) instead of Unix (LF).

**Solution:**

```bash
# Convert line endings
dos2unix setup.sh

# Or using git
git config core.autocrlf false
git rm --cached -r .
git reset --hard
```

---

### 14. MongoDB Connection Timeout

**Error:**
```
MongoServerError: connection timeout
```

**Solution:**

1. **Check MongoDB is running:**
   ```bash
   docker ps | grep mongodb
   ```

2. **Restart MongoDB:**
   ```bash
   docker-compose restart mongodb
   ```

3. **Check MongoDB logs:**
   ```bash
   docker logs nc-mongodb
   ```

4. **Verify connection string in .env:**
   ```env
   MONGODB_URI="mongodb://nc_user:nc_password@localhost:27017/nc_ecommerce"
   ```

---

### 15. Redis Connection Failed

**Error:**
```
Error: Redis connection to localhost:6379 failed
```

**Solution:**

1. **Check Redis is running:**
   ```bash
   docker ps | grep redis
   ```

2. **Test Redis connection:**
   ```bash
   docker exec -it nc-redis redis-cli -a nc_password ping
   ```
   Should return: `PONG`

3. **Restart Redis:**
   ```bash
   docker-compose restart redis
   ```

---

## 🔍 Diagnostic Commands

### Check System Status

```bash
# Check all running containers
docker ps

# Check all containers (including stopped)
docker ps -a

# Check Docker Compose services
docker-compose ps

# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs postgres
docker-compose logs mongodb
docker-compose logs redis
```

### Check Application Status

```bash
# Check if ports are in use
lsof -i :3000  # Web app
lsof -i :3001  # Vendor dashboard
lsof -i :3002  # Admin panel
lsof -i :4000  # API Gateway

# Check Node processes
ps aux | grep node

# Check disk space
df -h

# Check memory usage
free -h  # Linux
top -l 1 | grep PhysMem  # Mac
```

### Test Database Connections

```bash
# Test PostgreSQL
docker exec -it nc-postgres psql -U nc_user -d nc_ecommerce -c "\dt"

# Test MongoDB
docker exec -it nc-mongodb mongosh -u nc_user -p nc_password nc_ecommerce --eval "db.stats()"

# Test Redis
docker exec -it nc-redis redis-cli -a nc_password ping
```

---

## 🆘 Getting More Help

### 1. Check Documentation
- [QUICKSTART.md](./QUICKSTART.md) - Beginner's guide
- [docs/SETUP.md](./docs/SETUP.md) - Detailed setup
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System architecture

### 2. Search Issues
Visit: https://github.com/abhijeetraiiit/Nc/issues

### 3. Ask the Community
Visit: https://github.com/abhijeetraiiit/Nc/discussions

### 4. Report a Bug

If you found a bug, create an issue with:
- **Error message** (full text)
- **Steps to reproduce**
- **System info** (OS, Node version, Docker version)
- **Logs** (from `docker logs` or console)

---

## 🧹 Clean Start

If all else fails, start fresh:

```bash
# Stop all containers
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Clean npm
rm -rf node_modules package-lock.json

# Clean build artifacts
rm -rf .turbo
rm -rf apps/*/.next
rm -rf packages/*/dist
rm -rf services/*/dist

# Start over
npm install
./setup.sh  # or setup.bat on Windows
```

---

**Still stuck?** Don't hesitate to ask for help in the GitHub Discussions!

*Last updated: February 2026*
