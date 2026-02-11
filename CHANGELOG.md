# Changelog

All notable changes to the Nc e-commerce platform will be documented in this file.

## [Unreleased] - 2026-02-11

### 🔒 Security

- **FIXED:** Next.js critical vulnerability CVE-2025-66478 (15.1.0 → 15.5.12)
- **FIXED:** All 11 npm security vulnerabilities (→ 0 vulnerabilities)
- **UPDATED:** ESLint from deprecated 8.x to supported 9.17.0
- **UPDATED:** NestJS from 10.x to 11.x (latest stable)
- **UPDATED:** All deprecated packages to supported versions

### 🐛 Bug Fixes

- **FIXED:** Turbo concurrency error (14 persistent tasks but limit was 10)
  - Added `--concurrency=20` flag to dev scripts
  - All 14 workspaces now start successfully
- **FIXED:** Compatibility with Turbo 2.0
- **FIXED:** Resolved all npm audit warnings
- **FIXED:** Removed all deprecated package warnings

### ✨ Added

- **RUNNING-LOCALLY.md** - Quick start guide with 3 setup options
- Security-patched package versions across all workspaces
- Turbo 2.0 compatibility (pipeline → tasks)
- Stream UI for better Turbo output
- Build artifacts excluded from git (.gitignore updated)

### 📦 Package Updates

#### Frontend (Apps)
- next: 15.1.0 → 15.5.12
- eslint: ^8.56.0 → ^9.17.0
- eslint-config-next: 15.1.0 → 15.5.12

#### Backend (Services)
- @nestjs/common: ^10.3.0 → ^11.1.13
- @nestjs/core: ^10.3.0 → ^11.1.13
- @nestjs/cli: ^10.2.1 → ^11.0.16
- @nestjs/swagger: ^7.1.17 → ^11.2.6
- @nestjs/jwt: ^10.2.0 → ^11.0.2
- @nestjs/passport: ^10.0.3 → ^11.0.5
- @nestjs/throttler: ^5.1.1 → ^6.5.0
- eslint: ^8.56.0 → ^9.17.0
- @typescript-eslint/eslint-plugin: ^6.15.0 → ^8.19.1
- @typescript-eslint/parser: ^6.15.0 → ^8.19.1

#### Root
- turbo: ^1.11.0 → ^2.3.0
- eslint: ^8.54.0 → ^9.17.0
- husky: ^8.0.3 → ^9.1.7

### 🔧 Configuration

- Updated `turbo.json` to use `tasks` instead of deprecated `pipeline`
- Added `--concurrency=20` to handle 14 concurrent dev tasks
- Added `"ui": "stream"` for better console output
- Updated `.gitignore` to exclude `*.tsbuildinfo` and `next-env.d.ts`

### 📚 Documentation

- Added comprehensive local setup instructions
- Clarified 3 different ways to run the platform
- Included troubleshooting for common issues

---

## Initial Release - 2026-02-10

### 🎉 Initial Platform Launch

#### Architecture
- Turborepo monorepo structure
- 3 Next.js 15 applications (Web, Vendor, Admin)
- 7 NestJS microservices
- 4 shared packages

#### Features
- Neubrutalism design system
- India-first compliance (DPDP, GST, Legal Metrology, FDI)
- AI-ready infrastructure
- Cloud deployment configurations
- Complete documentation suite

#### Documentation
- QUICKSTART.md
- TROUBLESHOOTING.md
- ONLINE-DEPLOYMENT.md
- WEBSITE-OPEN.md
- Complete docs/ folder with 6 guides

#### DevOps
- Docker Compose setup
- GitHub Actions CI/CD
- Automated setup scripts (setup.sh, setup.bat)
- Pre-flight dependency checks
