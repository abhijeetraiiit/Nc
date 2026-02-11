# API Gateway Service

Central API gateway for the Nc e-commerce platform.

## Features

- 🔐 JWT Authentication
- 📊 Rate Limiting (100 req/min)
- 📚 Swagger API Documentation
- 🛣️ Request Routing
- 🔒 Authorization Guards
- 📝 Request Validation

## Endpoints

### Health & Info
- `GET /` - Health check
- `GET /version` - API version info

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/profile` - Get user profile (protected)

### Documentation
- `GET /api/docs` - Swagger UI

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

## Environment Variables

```env
PORT=4000
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002
NODE_ENV=development
```

## Rate Limiting

Default: 100 requests per minute per IP

Can be configured in `app.module.ts`:
```typescript
ThrottlerModule.forRoot([
  {
    ttl: 60000,
    limit: 100,
  },
])
```

## JWT Configuration

- Algorithm: HS256
- Expiration: 24 hours
- Secret: Set via `JWT_SECRET` env variable

## Microservices Integration

This gateway routes requests to:
- Vendor Service (port 4001)
- Product Service (port 4002)
- Order Service (port 4003)
- Compliance Service (port 4004)
- AI Service (port 4005)
- Notification Service (port 4006)

## Security

- CORS enabled
- Helmet middleware for security headers
- Input validation with class-validator
- JWT-based authentication
- Rate limiting to prevent abuse
