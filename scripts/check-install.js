#!/usr/bin/env node

/**
 * Check if dependencies are installed before running commands
 * This prevents cryptic error messages like "turbo: not found"
 */

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function checkNodeModules() {
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    console.error(`\n${RED}${BOLD}❌ Error: Dependencies not installed${RESET}\n`);
    console.error(`${YELLOW}It looks like you haven't installed the project dependencies yet.${RESET}\n`);
    console.error(`${BOLD}Please run:${RESET}`);
    console.error(`  ${GREEN}npm install${RESET}\n`);
    console.error(`${BOLD}Then try again:${RESET}`);
    console.error(`  ${GREEN}npm run dev${RESET}\n`);
    console.error(`${BLUE}💡 Tip: For automated setup, run:${RESET}`);
    console.error(`  ${GREEN}./setup.sh${RESET} (Linux/Mac) or ${GREEN}setup.bat${RESET} (Windows)\n`);
    process.exit(1);
  }
  
  // Check if turbo is installed
  const turboPath = path.join(nodeModulesPath, 'turbo');
  if (!fs.existsSync(turboPath)) {
    console.error(`\n${RED}${BOLD}❌ Error: Turbo not found${RESET}\n`);
    console.error(`${YELLOW}The dependencies may be corrupted or incomplete.${RESET}\n`);
    console.error(`${BOLD}Please run:${RESET}`);
    console.error(`  ${GREEN}npm install${RESET}\n`);
    process.exit(1);
  }
  
  // All checks passed
  console.log(`${GREEN}✓${RESET} Dependencies installed`);
  return true;
}

// Run the check
checkNodeModules();
