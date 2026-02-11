# Turbo Concurrency Fix

## Problem

When running `npm run dev`, you got this error:

```
Error: You have 14 persistent tasks but `turbo` is configured 
for concurrency of 10. Set --concurrency to at least 15
```

## Root Cause

The Nc platform has **14 workspaces**, each with a `dev` task marked as `persistent: true`:

**Workspaces:**
- **Apps (3):** web, vendor-dashboard, admin
- **Services (7):** api-gateway, vendor-service, product-service, order-service, compliance-service, ai-service, notification-service
- **Packages (4):** ui, design-system, database, shared

Turbo's default concurrency limit is 10, but we need to run all 14 simultaneously.

## Solution

### Option 1: Using npm run dev (Recommended)

The `npm run dev` command now automatically includes `--concurrency=20`:

```bash
npm run dev
```

This will:
1. ✅ Check if dependencies are installed
2. ✅ Start all 14 dev tasks with concurrency 20
3. ✅ Show helpful URLs for each app

### Option 2: Using turbo directly

If you want to use turbo directly:

```bash
turbo run dev --concurrency=20
```

### Option 3: Using npm run dev:direct

For advanced users who want to skip the dependency check:

```bash
npm run dev:direct
```

This runs `turbo run dev --concurrency=20` without pre-flight checks.

## Technical Details

### What Changed

**package.json:**
```json
{
  "scripts": {
    "dev": "node scripts/dev-with-check.js",
    "dev:direct": "turbo run dev --concurrency=20"
  }
}
```

**scripts/dev-with-check.js:**
```javascript
execSync('turbo run dev --concurrency=20', { stdio: 'inherit' });
```

**turbo.json:**
```json
{
  "ui": "stream",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Why --concurrency=20?

- **Current need:** 14 workspaces
- **Set to 20:** Provides headroom for future expansion
- **No performance impact:** Only runs as many tasks as you have workspaces

## Verification

After the fix, running `npm run dev` should show:

```bash
🔍 Checking dependencies...
✓ Dependencies installed

🚀 Starting development servers...

Applications will be available at:
  Web App:          http://localhost:3000
  Vendor Dashboard: http://localhost:3001
  Admin Panel:      http://localhost:3002
  API Gateway:      http://localhost:4000

• Packages in scope: @nc/admin, @nc/ai-service, ... (14 total)
• Running dev in 14 packages
• Remote caching disabled

[All apps start successfully]
```

## Common Issues

### Issue: "turbo: command not found"

**Solution:** Install dependencies first:
```bash
npm install
```

### Issue: "Dependencies not installed"

**Solution:** The check is correct - run:
```bash
npm install
npm run dev
```

### Issue: Port already in use

**Solution:** Stop any services running on ports 3000-3002 or 4000:
```bash
# Find processes using ports
lsof -i :3000
lsof -i :3001
lsof -i :3002
lsof -i :4000

# Kill them if needed
kill -9 <PID>
```

## Additional Resources

- [Turbo Documentation - Concurrency](https://turbo.build/repo/docs/reference/run#--concurrency)
- [RUNNING-LOCALLY.md](../RUNNING-LOCALLY.md) - Complete setup guide
- [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) - General troubleshooting

## Summary

✅ **Problem:** Turbo concurrency limit too low (10 < 14 workspaces)  
✅ **Solution:** Added `--concurrency=20` to dev scripts  
✅ **Result:** All 14 workspaces now start successfully!
