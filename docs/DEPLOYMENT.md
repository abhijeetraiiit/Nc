# Deployment Guide

## Production Deployment

### Prerequisites

- Docker & Docker Compose
- Node.js 20.x
- PostgreSQL 16
- MongoDB 7
- Redis 7
- Domain name with SSL certificate
- Cloud hosting (AWS, Azure, or GCP)

## Environment Setup

### 1. Production Environment Variables

Create `.env.production`:

```env
NODE_ENV=production

# Database URLs (use production credentials)
DATABASE_URL="postgresql://user:password@prod-db.example.com:5432/nc_ecommerce"
MONGODB_URI="mongodb://user:password@prod-mongo.example.com:27017/nc_ecommerce"
REDIS_URL="redis://:password@prod-redis.example.com:6379"

# JWT Secret (MUST be changed!)
JWT_SECRET="your-super-secure-secret-key-here"

# API URLs
API_GATEWAY_URL="https://api.nc-ecommerce.in"
WEB_APP_URL="https://www.nc-ecommerce.in"
VENDOR_DASHBOARD_URL="https://vendor.nc-ecommerce.in"
ADMIN_PANEL_URL="https://admin.nc-ecommerce.in"

# External Services
GSTN_API_KEY="production-gstn-key"
WHATSAPP_BUSINESS_TOKEN="production-whatsapp-token"
GOOGLE_SPEECH_API_KEY="production-google-key"
OPENAI_API_KEY="production-openai-key"

# Payment Gateways
RAZORPAY_KEY_ID="production-razorpay-key"
RAZORPAY_KEY_SECRET="production-razorpay-secret"

# AWS Configuration
AWS_ACCESS_KEY_ID="production-aws-key"
AWS_SECRET_ACCESS_KEY="production-aws-secret"
AWS_REGION="ap-south-1"
S3_BUCKET="nc-ecommerce-prod-assets"
CLOUDFRONT_DOMAIN="cdn.nc-ecommerce.in"

# Email & SMS
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="noreply@nc-ecommerce.in"
SMTP_PASSWORD="production-smtp-password"

TWILIO_ACCOUNT_SID="production-twilio-sid"
TWILIO_AUTH_TOKEN="production-twilio-token"
TWILIO_PHONE_NUMBER="+911234567890"
```

## Deployment Steps

### Step 1: Build Applications

```bash
# Install dependencies
npm ci --production

# Build all packages
npm run build
```

### Step 2: Database Migration

```bash
# Run Prisma migrations
cd packages/database
npx prisma migrate deploy
npx prisma generate
```

### Step 3: Docker Production Build

#### Build Images
```bash
# Build all service images
docker-compose -f docker-compose.prod.yml build

# Tag images for registry
docker tag nc/api-gateway:latest your-registry.com/nc/api-gateway:v1.0.0
docker tag nc/vendor-service:latest your-registry.com/nc/vendor-service:v1.0.0
# ... repeat for all services
```

#### Push to Registry
```bash
# Login to registry
docker login your-registry.com

# Push images
docker push your-registry.com/nc/api-gateway:v1.0.0
docker push your-registry.com/nc/vendor-service:v1.0.0
# ... repeat for all services
```

### Step 4: Deploy Services

#### Option A: Docker Compose (Simple Deployment)

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  api-gateway:
    image: your-registry.com/nc/api-gateway:v1.0.0
    restart: always
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - MONGODB_URI=${MONGODB_URI}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - mongodb
      - redis

  # Add other services...
```

Deploy:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### Option B: Kubernetes (Recommended for Scale)

See `k8s/` directory for Kubernetes manifests (coming soon).

### Step 5: Nginx Reverse Proxy

Configure Nginx as reverse proxy:

```nginx
# /etc/nginx/sites-available/nc-ecommerce

# API Gateway
server {
    listen 80;
    server_name api.nc-ecommerce.in;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Web App
server {
    listen 80;
    server_name www.nc-ecommerce.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Vendor Dashboard
server {
    listen 80;
    server_name vendor.nc-ecommerce.in;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Admin Panel
server {
    listen 80;
    server_name admin.nc-ecommerce.in;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable configuration:
```bash
sudo ln -s /etc/nginx/sites-available/nc-ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: SSL Certificate

Use Let's Encrypt for free SSL:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.nc-ecommerce.in
sudo certbot --nginx -d www.nc-ecommerce.in
sudo certbot --nginx -d vendor.nc-ecommerce.in
sudo certbot --nginx -d admin.nc-ecommerce.in
```

Auto-renewal:
```bash
sudo certbot renew --dry-run
```

## Monitoring & Logging

### Application Logs

View service logs:
```bash
# Docker logs
docker logs nc-api-gateway --tail 100 -f

# PM2 logs (if using PM2)
pm2 logs api-gateway
```

### Health Monitoring

Setup health check endpoints:
```bash
# Check API Gateway
curl https://api.nc-ecommerce.in/health

# Check all services
./scripts/health-check.sh
```

### Performance Monitoring

Recommended tools:
- **New Relic** - APM
- **Datadog** - Infrastructure monitoring
- **Sentry** - Error tracking
- **LogRocket** - Session replay

## Scaling

### Horizontal Scaling

Add more service instances:

```bash
# Scale API Gateway to 3 instances
docker-compose -f docker-compose.prod.yml up -d --scale api-gateway=3
```

### Load Balancing

Use Nginx or AWS ALB for load balancing across instances.

### Database Scaling

#### PostgreSQL
- Read replicas for read-heavy operations
- Connection pooling (PgBouncer)
- Vertical scaling for writes

#### MongoDB
- Replica sets for high availability
- Sharding for horizontal scaling

#### Redis
- Redis Cluster for sharding
- Redis Sentinel for failover

## Backup & Recovery

### Database Backups

#### PostgreSQL
```bash
# Daily backup
pg_dump -U nc_user nc_ecommerce > backup-$(date +%Y%m%d).sql

# Automated backup script
0 2 * * * /usr/local/bin/backup-postgres.sh
```

#### MongoDB
```bash
# Daily backup
mongodump --uri="mongodb://user:pass@host:27017/nc_ecommerce" --out=/backups/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://user:pass@host:27017/nc_ecommerce" /backups/20260210
```

### Application Backups
- Code: Git repository
- Assets: S3 versioning enabled
- Configs: Encrypted backup storage

## Security

### Production Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secrets
- [ ] Enable HTTPS/TLS everywhere
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Implement WAF (Web Application Firewall)
- [ ] Regular security audits
- [ ] Update dependencies regularly
- [ ] Enable database encryption at rest
- [ ] Set up VPN for internal services
- [ ] Implement DDoS protection
- [ ] Use secrets management (AWS Secrets Manager, etc.)

## CI/CD Pipeline

### GitHub Actions

Production deployment triggered on:
- Push to `main` branch
- Manual workflow dispatch

Workflow steps:
1. Run tests
2. Build Docker images
3. Push to registry
4. Deploy to staging
5. Run smoke tests
6. Deploy to production (manual approval)
7. Send deployment notifications

## Rollback Procedure

If deployment fails:

```bash
# Revert to previous version
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Database rollback
npx prisma migrate rollback
```

## Post-Deployment

### Verification
- [ ] Test all critical user flows
- [ ] Verify payment processing
- [ ] Check email/SMS notifications
- [ ] Test WhatsApp integration
- [ ] Verify GST invoice generation
- [ ] Check compliance endpoints

### Monitoring
- [ ] Set up alerts for errors
- [ ] Monitor response times
- [ ] Track database performance
- [ ] Watch CPU/memory usage
- [ ] Monitor disk space

## Support

Production issues:
- **Email**: devops@nc-ecommerce.in
- **Slack**: #production-alerts
- **On-call**: PagerDuty rotation

---

*Last Updated: February 2026*
