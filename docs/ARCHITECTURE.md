# Nc E-commerce Platform - Architecture

## System Overview

Nc is an enterprise-grade multivendor e-commerce platform built with a modern microservices architecture, designed specifically for the Indian market with compliance, vernacular support, and AI-native features.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
├─────────────────────────────────────────────────────────────────┤
│  Web App (Next.js)  │  Vendor Dashboard  │  Admin Panel │ Mobile│
│     Port 3000       │     Port 3001      │  Port 3002   │  App  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API Gateway (Port 4000)                      │
│  • Authentication (JWT)                                          │
│  • Rate Limiting                                                 │
│  • Request Routing                                               │
│  • API Documentation (Swagger)                                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Vendor Service   │  │ Product Service  │  │ Order Service    │
│   Port 4001      │  │   Port 4002      │  │   Port 4003      │
│                  │  │                  │  │                  │
│ • KYC Mgmt       │  │ • Catalog Mgmt   │  │ • Order Process  │
│ • Trust Score    │  │ • Search         │  │ • Fulfillment    │
│ • Warehouse      │  │ • Inventory      │  │ • Tracking       │
└──────────────────┘  └──────────────────┘  └──────────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Compliance Svc   │  │  AI Service      │  │ Notification Svc │
│   Port 4004      │  │   Port 4005      │  │   Port 4006      │
│                  │  │                  │  │                  │
│ • DPDP Act       │  │ • Voice Commerce │  │ • WhatsApp       │
│ • GST Automation │  │ • Recommendations│  │ • Email          │
│ • Legal Metro    │  │ • Vector Search  │  │ • SMS            │
└──────────────────┘  └──────────────────┘  └──────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   PostgreSQL     │  │    MongoDB       │  │     Redis        │
│ Transactional DB │  │  Product Catalog │  │  Cache & Queue   │
│                  │  │  User Prefs      │  │  Sessions        │
│ • Users          │  │  • Products      │  │  • Trending      │
│ • Vendors        │  │  • Reviews       │  │  • Cart          │
│ • Orders         │  │  • Cart          │  │                  │
│ • Payments       │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Neubrutalism theme)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Mobile**: Flutter (iOS & Android)

### Backend
- **Framework**: NestJS (Microservices)
- **Language**: TypeScript
- **API Style**: RESTful + GraphQL (planned)
- **Authentication**: JWT with Passport.js
- **Validation**: Class Validator
- **Documentation**: Swagger/OpenAPI

### Databases
- **PostgreSQL**: Transactional data (users, orders, payments)
- **MongoDB**: Flexible catalog (products, reviews, preferences)
- **Redis**: Caching, sessions, real-time data
- **Pinecone**: Vector database for AI recommendations

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose (development)
- **Monorepo**: Turborepo
- **CI/CD**: GitHub Actions
- **Cloud**: AWS (S3, CloudFront)

## Microservices Architecture

### 1. API Gateway (Port 4000)
**Responsibilities:**
- Single entry point for all client requests
- JWT authentication and authorization
- Rate limiting (100 req/min default)
- Request routing to microservices
- API documentation via Swagger
- CORS management

**Key Features:**
- Health check endpoint
- Token validation
- Request/response transformation
- Centralized error handling

### 2. Vendor Service (Port 4001)
**Responsibilities:**
- Vendor onboarding and KYC
- Trust Score calculation
- Warehouse management
- Performance analytics
- Payout processing

**Trust Score Algorithm:**
```typescript
TrustScore = (
  returnRateScore * 0.3 +
  dispatchSpeedScore * 0.25 +
  authenticityScore * 0.25 +
  customerRatingScore * 0.2
)
```

**Database**: PostgreSQL (vendors, warehouses, trust_score_history)

### 3. Product Service (Port 4002)
**Responsibilities:**
- Product catalog management
- Multi-language product data
- Image optimization and CDN upload
- GI-tag verification
- Search and filtering

**Database**: MongoDB (products collection)

**Features:**
- Flexible product attributes
- Multi-language support (12+ languages)
- Inventory tracking per warehouse
- SEO optimization (slugs, meta tags)

### 4. Order Service (Port 4003)
**Responsibilities:**
- Order processing
- Payment integration
- Delivery tracking
- Return/refund workflows
- Invoice generation

**Database**: PostgreSQL (orders, order_items, payments)

**Integrations:**
- Razorpay & PhonePe (payment gateways)
- Dunzo, Shadowfax, Delhivery (logistics)
- GST invoice generation

### 5. Compliance Service (Port 4004)
**Responsibilities:**
- DPDP Act 2023 compliance
- GST automation
- Legal Metrology compliance
- Consumer Protection compliance
- FDI Policy compliance

**Key Features:**
- Consent manager
- Data access/deletion requests (30-day SLA)
- TCS deduction automation
- GSTR-1 auto-generation
- Grievance officer management

**Database**: PostgreSQL (consent_logs, data_requests)

### 6. AI Service (Port 4005)
**Responsibilities:**
- Voice commerce (Hinglish + 12 languages)
- Personalized recommendations
- Product description generation
- Fake review detection
- Vector search

**Technologies:**
- Google Speech-to-Text API
- OpenAI GPT-4
- Pinecone vector database

**Database**: Pinecone (user & product embeddings)

### 7. Notification Service (Port 4006)
**Responsibilities:**
- WhatsApp Business API integration
- Email notifications (transactional & marketing)
- SMS alerts (OTP, order updates)
- Push notifications (PWA)

**Integrations:**
- WhatsApp Business API
- SendGrid / SMTP
- Twilio

**Database**: PostgreSQL (notifications table)

## Data Flow Examples

### 1. Product Search Flow
```
User → Web App → API Gateway → Product Service → MongoDB
                                      ↓
                                   AI Service
                                      ↓
                                   Pinecone
```

### 2. Order Placement Flow
```
User → Checkout → API Gateway → Order Service
                                      ↓
                                 PostgreSQL
                                      ↓
                              Payment Gateway
                                      ↓
                            Notification Service
                                      ↓
                              WhatsApp/Email
```

### 3. Trust Score Calculation
```
Vendor Dashboard → API Gateway → Vendor Service
                                      ↓
                    Calculate Trust Score Components
                                      ↓
                                 PostgreSQL
```

## Security

### Authentication
- JWT tokens with 24-hour expiration
- Refresh token rotation
- Password hashing with bcrypt

### Authorization
- Role-based access control (RBAC)
- Vendor/Admin/User roles
- Protected routes with guards

### Data Protection
- HTTPS/TLS encryption
- Database encryption at rest
- PII masking in logs
- DPDP Act compliance

### Rate Limiting
- API Gateway: 100 req/min
- Auth endpoints: 5 req/min
- Search endpoints: 30 req/min

## Scalability

### Horizontal Scaling
- Stateless microservices
- Load balancing with Nginx
- Database replication (read replicas)

### Caching Strategy
- Redis for session data
- CDN for static assets
- Query result caching (5-60 min TTL)

### Performance Optimization
- Next.js Server Components
- Partial Prerendering (PPR)
- Image optimization (WebP, AVIF)
- Code splitting
- Lazy loading

## Monitoring & Observability

### Metrics (Planned)
- Request latency
- Error rates
- Database query performance
- Trust Score trends

### Logging
- Structured logging (JSON)
- Centralized log aggregation
- Error tracking

### Health Checks
- Service health endpoints
- Database connection status
- External API availability

## Deployment

### Development
```bash
docker-compose up -d
npm install
npm run dev
```

### Production
- Docker containers
- Kubernetes orchestration (planned)
- Auto-scaling based on load
- Blue-green deployments
- Rollback capability

## Future Enhancements

- [ ] GraphQL API layer
- [ ] Server-Sent Events for real-time updates
- [ ] WebSocket for live chat
- [ ] Kubernetes deployment
- [ ] Elasticsearch for advanced search
- [ ] Machine learning model deployment
- [ ] Multi-region support
- [ ] CDN edge functions
