# Helper Scripts

This directory contains helper scripts that improve the developer experience.

## Scripts

### `check-install.js`
Checks if project dependencies are installed before running commands.

**Usage:**
```bash
npm run check-install
```

**What it checks:**
- ✅ `node_modules/` directory exists
- ✅ `turbo` package is installed

**What it does on failure:**
- ❌ Shows a clear error message
- 💡 Provides helpful guidance on what to do
- 🚫 Exits with error code 1

### `dev-with-check.js`
Runs the development servers with pre-flight checks for a better experience.

**Usage:**
```bash
npm run dev  # Uses this script automatically
```

**What it does:**
1. ✅ Runs `check-install.js` to verify dependencies
2. ✅ Shows URLs where apps will be available
3. ✅ Starts all development servers with `turbo run dev`

**Benefits:**
- Clear error messages if dependencies aren't installed
- No cryptic "command not found" errors
- Helpful URLs displayed upfront
- Better onboarding experience for new developers

## Why These Scripts?

**Problem:** When new developers clone the repo and run `npm run dev`, they get:
```
sh: 1: turbo: not found
```

This is confusing and doesn't tell them what to do.

**Solution:** Our scripts check first and provide helpful guidance:
```
❌ Error: Dependencies not installed

Please run:
  npm install

Then try again:
  npm run dev
```

Much better! 🎉

## Technical Details

Both scripts use:
- Node.js built-in `fs` and `path` modules (no external dependencies)
- ANSI color codes for colored terminal output
- `process.exit(1)` to signal errors properly
- `execSync` to run child processes

They're designed to:
- ✅ Work on Windows, Mac, and Linux
- ✅ Provide clear error messages
- ✅ Have zero external dependencies
- ✅ Be easy to maintain

## Making Changes

If you need to modify these scripts:

1. **Test on multiple platforms** (Windows, Mac, Linux)
2. **Keep error messages clear** - Remember, these are for beginners
3. **Use colors wisely** - Red for errors, green for success, yellow for warnings
4. **Keep zero dependencies** - Use only Node.js built-ins

## Related Documentation

- [npm run dev Troubleshooting](../docs/NPM-DEV-TROUBLESHOOTING.md) - Detailed troubleshooting guide
- [QUICKSTART.md](../QUICKSTART.md) - Setup guide for beginners
- [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) - General troubleshooting

---

**Made with ❤️ to improve developer experience**
