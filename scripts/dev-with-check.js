#!/usr/bin/env node

/**
 * Run dev command with pre-flight checks
 * This ensures a better developer experience with helpful error messages
 */

const { execSync } = require('child_process');

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

try {
  // First, run the installation check
  console.log(`${BLUE}🔍 Checking dependencies...${RESET}`);
  execSync('node scripts/check-install.js', { stdio: 'inherit' });
  
  // If check passes, run turbo dev
  console.log(`${GREEN}${BOLD}\n🚀 Starting development servers...${RESET}\n`);
  console.log(`${BLUE}Applications will be available at:${RESET}`);
  console.log(`  Web App:          ${GREEN}http://localhost:3000${RESET}`);
  console.log(`  Vendor Dashboard: ${GREEN}http://localhost:3001${RESET}`);
  console.log(`  Admin Panel:      ${GREEN}http://localhost:3002${RESET}`);
  console.log(`  API Gateway:      ${GREEN}http://localhost:4000${RESET}\n`);
  
  execSync('turbo run dev --concurrency=20', { stdio: 'inherit' });
  
} catch (error) {
  // Error already handled by check-install.js or turbo
  process.exit(1);
}
