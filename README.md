# Nc - Next-Generation Multivendor E-commerce Platform

> **Enterprise-grade, India-focused multivendor marketplace built for 2026**

## 🎯 Vision

Building the future of e-commerce in India with:
- 🎨 **Modern UX** - Bento grids, scrollytelling, mobile-first design
- 🇮🇳 **India-First** - Vernacular support, WhatsApp checkout, hyper-local delivery
- 🤖 **AI-Native** - Voice commerce, personalized recommendations
- ⚖️ **Compliance-Ready** - DPDP Act, GST automation, Legal Metrology

## 🚀 What Makes Us Different

| Feature | Traditional Platforms | Nc Platform |
|---------|----------------------|-------------|
| Layout | Endless grid | Bento Grid + Scrollytelling |
| Design | Dated UI | Neubrutalism (bold, modern) |
| Language | English-first | Hinglish + 12 Indian languages |
| Checkout | Web-only | WhatsApp integration |
| Delivery | "2-3 days" | "Arrives at 3 PM today" |
| Trust | 5-star rating | AI-powered Trust Score |
| Discovery | Generic | City-specific trending |

## 🏗️ Architecture

**Monorepo Structure:**
```
├── apps/
│   ├── web/              # Customer-facing Next.js 15 app
│   ├── vendor-dashboard/ # Vendor management portal
│   ├── admin/            # Admin control panel
│   └── mobile/           # Flutter mobile app
├── packages/
│   ├── ui/               # Shared component library
│   ├── design-system/    # Neubrutalism design tokens
│   └── database/         # Prisma schemas
└── services/
    ├── api-gateway/         # NestJS API Gateway
    ├── vendor-service/      # Vendor & Trust Score
    ├── product-service/     # Product catalog
    ├── order-service/       # Orders & delivery
    ├── compliance-service/  # DPDP, GST, Legal
    ├── ai-service/          # Voice commerce, AI
    └── notification-service/ # WhatsApp, Email, SMS
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Mobile**: Flutter
- **Backend**: NestJS (Microservices)
- **Databases**: PostgreSQL, MongoDB, Redis, Pinecone
- **AI**: Google Speech API, OpenAI, Vector Search
- **DevOps**: Docker, Turborepo, GitHub Actions

## ⚖️ Compliance (2026 Standards)

✅ **DPDP Act 2023** - Consent Manager, Easy data revocation  
✅ **GST Automation** - TCS deduction, GSTR-1 generation  
✅ **Legal Metrology** - Unit pricing (₹/gram), manufacturer details  
✅ **Consumer Protection** - Grievance Officer, Country of Origin  
✅ **FDI Policy** - Pure marketplace model (no inventory ownership)

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended for Beginners)

**Linux/Mac:**
```bash
git clone https://github.com/abhijeetraiiit/Nc.git
cd Nc
./setup.sh
```

**Windows:**
```cmd
git clone https://github.com/abhijeetraiiit/Nc.git
cd Nc
setup.bat
```

### Option 2: Manual Setup

```bash
# 1. Clone repository
git clone https://github.com/abhijeetraiiit/Nc.git
cd Nc

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env

# 4. Start databases
docker-compose up -d postgres mongodb redis

# 5. Run database migrations
cd packages/database
npx prisma generate
npx prisma migrate dev
cd ../..

# 6. Start all services
npm run dev
```

### Access Applications
- 🌐 **Web App**: http://localhost:3000
- 👔 **Vendor Dashboard**: http://localhost:3001
- 🔧 **Admin Panel**: http://localhost:3002
- 🔌 **API Gateway**: http://localhost:4000
- 📚 **API Docs**: http://localhost:4000/api/docs

### 📖 Detailed Guide
**New to the project?** Read the [**Complete Step-by-Step Guide**](./QUICKSTART.md) for beginners!

## 📋 Development Status

✅ **Foundation Complete** - Phase 1 delivered!

### ✅ Implemented Features:
- [x] Bento Grid landing page with Neubrutalism design
- [x] Complete Turbo monorepo structure
- [x] Next.js 15 apps (web, vendor dashboard, admin)
- [x] NestJS microservices (7 services)
- [x] PostgreSQL + MongoDB + Redis setup
- [x] Prisma ORM with complete schemas
- [x] JWT authentication & authorization
- [x] Rate limiting & API documentation
- [x] Compliance framework (DPDP, GST, Legal Metrology)
- [x] Docker development environment
- [x] CI/CD pipeline with GitHub Actions
- [x] Comprehensive documentation

### 🚧 Next Phase:
- [ ] Vernacular voice search (Hinglish + 12 languages)
- [ ] WhatsApp checkout flow integration
- [ ] AI Trust Score calculation
- [ ] Hyper-local delivery integration
- [ ] 3D product viewer
- [ ] Video review system
- [ ] Real-time city trending products
- [ ] Complete GST automation
- [ ] Full DPDP consent manager

## 📚 Documentation

Comprehensive docs available in `/docs`:
- [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md) - System design & microservices
- [**COMPLIANCE.md**](./docs/COMPLIANCE.md) - Indian regulatory requirements
- [**SETUP.md**](./docs/SETUP.md) - Local development setup
- [**API.md**](./docs/API.md) - API endpoints & examples
- [**CONTRIBUTING.md**](./docs/CONTRIBUTING.md) - Development guidelines

## 📄 License

Proprietary - All rights reserved

## 🤝 Contact

**Project Owner**: @abhijeetraiiit

---

**Built with ❤️ for the Indian Market**