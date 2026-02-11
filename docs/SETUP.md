# Local Development Setup Guide

## Prerequisites

### Required Software
- **Node.js**: v20.x or higher
- **npm**: v10.x or higher
- **Docker**: v24.x or higher
- **Docker Compose**: v2.x or higher
- **Git**: v2.x or higher

### Optional (for specific services)
- **Flutter**: v3.16.0 or higher (for mobile app)
- **PostgreSQL Client**: For direct database access
- **MongoDB Compass**: For MongoDB GUI
- **Redis CLI**: For Redis debugging

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/abhijeetraiiit/Nc.git
cd Nc
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies
npm install
```

This will install dependencies for:
- All frontend apps (web, vendor-dashboard, admin)
- All backend services (7 microservices)
- All shared packages (ui, design-system, database, shared)

### 3. Setup Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your local configuration
nano .env
```

**Minimum required variables**:
```env
DATABASE_URL="postgresql://nc_user:nc_password@localhost:5432/nc_ecommerce"
MONGODB_URI="mongodb://nc_user:nc_password@localhost:27017/nc_ecommerce"
REDIS_URL="redis://:nc_password@localhost:6379"
JWT_SECRET="your-secret-key"
```

### 4. Start Development Databases

```bash
# Start PostgreSQL, MongoDB, and Redis
docker-compose up -d postgres mongodb redis
```

**Verify databases are running**:
```bash
docker ps
```

You should see three containers running:
- `nc-postgres`
- `nc-mongodb`
- `nc-redis`

### 5. Run Database Migrations

```bash
# Generate Prisma client
cd packages/database
npx prisma generate

# Run migrations
npx prisma migrate dev

# Go back to root
cd ../..
```

### 6. Start Development Servers

```bash
# Start all applications in development mode
npm run dev
```

This will start:
- **Web App**: http://localhost:3000
- **Vendor Dashboard**: http://localhost:3001
- **Admin Panel**: http://localhost:3002
- **API Gateway**: http://localhost:4000
- **Vendor Service**: http://localhost:4001
- **Product Service**: http://localhost:4002
- **Order Service**: http://localhost:4003
- **Compliance Service**: http://localhost:4004
- **AI Service**: http://localhost:4005
- **Notification Service**: http://localhost:4006

## Individual Service Setup

### Frontend Apps

#### Web App
```bash
cd apps/web
npm run dev
```
Visit: http://localhost:3000

#### Vendor Dashboard
```bash
cd apps/vendor-dashboard
npm run dev
```
Visit: http://localhost:3001

#### Admin Panel
```bash
cd apps/admin
npm run dev
```
Visit: http://localhost:3002

### Backend Services

#### API Gateway
```bash
cd services/api-gateway
npm run dev
```
API: http://localhost:4000
Docs: http://localhost:4000/api/docs

#### Other Services
```bash
# Vendor Service
cd services/vendor-service && npm run dev

# Product Service
cd services/product-service && npm run dev

# Order Service
cd services/order-service && npm run dev

# Compliance Service
cd services/compliance-service && npm run dev

# AI Service
cd services/ai-service && npm run dev

# Notification Service
cd services/notification-service && npm run dev
```

## Database Management

### PostgreSQL

**Access via psql**:
```bash
docker exec -it nc-postgres psql -U nc_user -d nc_ecommerce
```

**Common commands**:
```sql
-- List all tables
\dt

-- View table structure
\d users

-- Query users
SELECT * FROM users LIMIT 10;
```

**Prisma Studio** (GUI):
```bash
cd packages/database
npx prisma studio
```
Visit: http://localhost:5555

### MongoDB

**Access via mongo shell**:
```bash
docker exec -it nc-mongodb mongosh -u nc_user -p nc_password nc_ecommerce
```

**Common commands**:
```javascript
// Show collections
show collections

// Query products
db.products.find().limit(10)

// Count documents
db.products.countDocuments()
```

**MongoDB Compass** (GUI):
Connection string: `mongodb://nc_user:nc_password@localhost:27017/nc_ecommerce`

### Redis

**Access via redis-cli**:
```bash
docker exec -it nc-redis redis-cli -a nc_password
```

**Common commands**:
```redis
# Get all keys
KEYS *

# Get a value
GET user:session:123

# Set a value
SET test:key "test value"

# Check cache stats
INFO stats
```

## Testing

### Unit Tests
```bash
# Run all tests
npm run test

# Run tests for specific package
cd packages/shared
npm run test
```

### Type Checking
```bash
# Type check all packages
npm run type-check
```

### Linting
```bash
# Lint all code
npm run lint

# Auto-fix lint issues
npm run lint -- --fix
```

### Code Formatting
```bash
# Format all code
npm run format
```

## Building for Production

### Build All Packages
```bash
npm run build
```

This will:
1. Build shared packages first
2. Build frontend applications
3. Build backend services

### Build Individual Apps
```bash
# Build web app
cd apps/web
npm run build

# Build API gateway
cd services/api-gateway
npm run build
```

### Docker Build
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build api-gateway
```

## Troubleshooting

### Port Already in Use
```bash
# Check what's using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Check if databases are running
docker-compose ps

# View database logs
docker-compose logs postgres
docker-compose logs mongodb
docker-compose logs redis

# Restart databases
docker-compose restart postgres mongodb redis
```

### Node Modules Issues
```bash
# Clean install
rm -rf node_modules
npm install

# Clean Turbo cache
rm -rf .turbo
npm run clean
npm install
```

### Prisma Issues
```bash
# Reset Prisma client
cd packages/database
rm -rf node_modules/.prisma
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Development Tips

### Turbo Commands
Turbo runs tasks in parallel with caching:

```bash
# Run dev for all apps
npm run dev

# Run build for all apps
npm run build

# Clear Turbo cache
rm -rf .turbo
```

### Environment-Specific Configs
```bash
# Development
.env.development

# Production
.env.production

# Local overrides (not committed)
.env.local
```

### Hot Reload
All apps support hot reload:
- Next.js apps: Automatic on file save
- NestJS services: Watch mode enabled
- Shared packages: Rebuild triggers dependent apps

### Debugging

#### VS Code Launch Config
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug API Gateway",
      "cwd": "${workspaceFolder}/services/api-gateway",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

#### Chrome DevTools for Node
```bash
# Start service with inspector
node --inspect dist/main.js
```

## Next Steps

After setup:
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system
2. Read [COMPLIANCE.md](./COMPLIANCE.md) for regulatory requirements
3. Check [API.md](./API.md) for API documentation
4. Review [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines

## Getting Help

- **Issues**: https://github.com/abhijeetraiiit/Nc/issues
- **Discussions**: https://github.com/abhijeetraiiit/Nc/discussions
- **Email**: dev@nc-ecommerce.in

---

Happy coding! 🚀
