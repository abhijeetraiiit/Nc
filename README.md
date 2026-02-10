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

```bash
# Clone repository
git clone https://github.com/abhijeetraiiit/Nc.git
cd Nc

# Install dependencies
npm install

# Setup development environment
docker-compose up -d

# Run migrations
npm run db:migrate

# Start development servers
npm run dev
```

## 📋 Development Status

🏗️ **In Development** - Enterprise foundation being built

### Planned Features:
- [ ] Bento Grid landing page
- [ ] Vernacular voice search (Hinglish + 12 languages)
- [ ] WhatsApp checkout flow
- [ ] AI Trust Score for vendors
- [ ] Hyper-local delivery (hour-level estimates)
- [ ] 3D product viewer
- [ ] Video review system
- [ ] City-specific trending products
- [ ] GST compliance automation
- [ ] DPDP consent manager

## 📚 Documentation

Coming soon:
- Architecture Guide
- Compliance Implementation
- API Documentation
- Deployment Guide
- Contributing Guidelines

## 📄 License

Proprietary - All rights reserved

## 🤝 Contact

**Project Owner**: @abhijeetraiiit

---

**Built with ❤️ for the Indian Market**