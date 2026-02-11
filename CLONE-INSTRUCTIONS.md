# ⚠️ Important: How to Clone This Repository

## The Problem

If you clone this repository with:
```bash
git clone https://github.com/abhijeetraiiit/Nc.git
```

You'll get the `main` branch, which **only contains README.md**. This causes errors like:
- ❌ `npm error Missing script: "dev"`
- ❌ Only ~100 packages instead of ~1,616
- ❌ No apps, services, or packages directories

## The Solution

The full platform code is on the **`copilot/create-ecommerce-monorepo`** branch (Pull Request #1).

### ✅ Correct Way to Clone

**Option 1: Clone specific branch directly (Recommended)**
```bash
git clone -b copilot/create-ecommerce-monorepo https://github.com/abhijeetraiiit/Nc.git
cd Nc
npm install
npm run dev
```

**Option 2: Clone then switch branch**
```bash
git clone https://github.com/abhijeetraiiit/Nc.git
cd Nc
git checkout copilot/create-ecommerce-monorepo
npm install
npm run dev
```

## How to Verify You're on the Correct Branch

After cloning, check your branch:

```bash
git branch
# Should show: * copilot/create-ecommerce-monorepo
```

Check if you have the platform code:

```bash
ls
# Should show: apps/ services/ packages/ scripts/ and many .md files
```

Check package count:

```bash
npm install
npm list --depth=0
# Should show ~14 workspace packages
```

## Troubleshooting

### "Missing script: 'dev'" Error

**Cause**: You're on the `main` branch
**Fix**: Switch to the PR branch:
```bash
git checkout copilot/create-ecommerce-monorepo
npm install
npm run dev
```

### Only 100 packages after npm install

**Cause**: You're on the `main` branch which has no workspaces
**Fix**: Same as above - switch to PR branch

### How to check which branch I'm on?

```bash
git branch
# The one with * is your current branch
```

### Why not merge to main?

The platform is currently in Pull Request #1 (`copilot/create-ecommerce-monorepo`).
Once the PR is approved and merged, the `main` branch will have all the code.

## Quick Commands

**Start fresh with correct branch:**
```bash
cd ..  # Go up one directory
rm -rf Nc  # Delete old clone (if exists)
git clone -b copilot/create-ecommerce-monorepo https://github.com/abhijeetraiiit/Nc.git
cd Nc
npm install
npm run dev
```

**Switch existing clone to correct branch:**
```bash
git fetch origin
git checkout copilot/create-ecommerce-monorepo
git pull origin copilot/create-ecommerce-monorepo
npm install
npm run dev
```

## Summary

| Branch | Content | Use For |
|--------|---------|---------|
| `main` | README only | ❌ Don't use |
| `copilot/create-ecommerce-monorepo` | Full platform | ✅ Use this! |

---

**Always use the `copilot/create-ecommerce-monorepo` branch until the PR is merged!**
