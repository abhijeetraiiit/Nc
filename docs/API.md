# API Documentation

## Base URL

```
Development: http://localhost:4000/api/v1
Production: https://api.nc-ecommerce.in/api/v1
```

## Interactive Documentation

Swagger UI available at:
```
http://localhost:4000/api/docs
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response** (201):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /auth/login
Login with credentials.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### GET /auth/profile
Get current user profile (protected).

**Response** (200):
```json
{
  "userId": "usr_123",
  "email": "user@example.com"
}
```

### Health & Version

#### GET /
Health check endpoint.

**Response** (200):
```json
{
  "status": "ok",
  "timestamp": "2026-02-10T17:48:49.729Z",
  "service": "api-gateway",
  "version": "1.0.0"
}
```

#### GET /version
Get API version information.

**Response** (200):
```json
{
  "version": "1.0.0",
  "apiVersion": "v1",
  "services": {
    "gateway": "1.0.0",
    "vendor": "1.0.0",
    "product": "1.0.0",
    "order": "1.0.0",
    "compliance": "1.0.0",
    "ai": "1.0.0",
    "notification": "1.0.0"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 429 Too Many Requests
```json
{
  "statusCode": 429,
  "message": "Too many requests"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## Rate Limiting

Default limits:
- General API: 100 requests per minute
- Auth endpoints: 5 requests per minute
- Search endpoints: 30 requests per minute

## Pagination

List endpoints support pagination:

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `sortBy`: Field to sort by
- `sortOrder`: `asc` or `desc`

**Response**:
```json
{
  "items": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

## Filtering

Use query parameters for filtering:

```
GET /api/v1/products?category=fashion&priceMin=1000&priceMax=5000
```

## Future Endpoints

Coming soon:
- Vendor management
- Product catalog
- Order processing
- Compliance reports
- AI recommendations
- Notifications

Full API documentation will be available at Swagger UI once services are implemented.

## Support

For API issues:
- Email: api-support@nc-ecommerce.in
- GitHub Issues: https://github.com/abhijeetraiiit/Nc/issues
