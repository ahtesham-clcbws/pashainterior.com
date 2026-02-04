# API Routes Specification

## Public API Routes

### POST /api/contact
**Purpose**: Submit contact form

**Request Body**:
```typescript
{
  name: string;
  email: string;
  phone?: string;
  message: string;
}
```

**Validation**:
- Name: min 2 chars, max 100 chars
- Email: valid email format
- Phone: optional, valid phone format
- Message: min 10 chars, max 1000 chars

**Response**:
```typescript
// Success
{
  success: true,
  message: "Thank you for your message. We'll get back to you soon."
}

// Error
{
  success: false,
  error: "Validation failed",
  details: {
    email: ["Invalid email format"]
  }
}
```

**Rate Limiting**: 3 submissions per IP per hour

**Side Effects**:
- Insert into SQLite database
- Send email notification (optional)

---

### GET /api/services
**Purpose**: Get all services

**Query Parameters**:
- `featured`: boolean (optional)

**Response**:
```typescript
{
  success: true,
  data: Service[]
}
```

---

### GET /api/services/[slug]
**Purpose**: Get single service by slug

**Response**:
```typescript
{
  success: true,
  data: Service
}
```

---

### GET /api/projects
**Purpose**: Get all projects

**Query Parameters**:
- `category`: string (optional)
- `featured`: boolean (optional)
- `limit`: number (optional)

**Response**:
```typescript
{
  success: true,
  data: Project[]
}
```

---

### GET /api/projects/[slug]
**Purpose**: Get single project by slug

**Response**:
```typescript
{
  success: true,
  data: Project
}
```

---

### GET /api/testimonials
**Purpose**: Get all testimonials

**Query Parameters**:
- `featured`: boolean (optional)
- `limit`: number (optional)

**Response**:
```typescript
{
  success: true,
  data: Testimonial[]
}
```

---

### GET /api/global
**Purpose**: Get global site data

**Response**:
```typescript
{
  success: true,
  data: GlobalData
}
```

---

## Admin API Routes

### POST /api/admin/auth/login
**Purpose**: Admin login with email and password

**Request Body**:
```typescript
{
  email: string;
  password: string;
}
```

**Validation**:
- Email must be either DEVELOPER_EMAIL or ADMIN_EMAIL from env
- Password must match hashed password from env

**Response**:
```typescript
// Success
{
  success: true,
  data: {
    user: {
      email: string;
      role: 'developer' | 'admin';
    },
    token: string; // JWT token
  }
}

// Error
{
  success: false,
  error: "Invalid email or password"
}
```

**Side Effects**:
- Verify password using bcryptjs
- Set HTTP-only cookie with JWT token
- Token expires in 7 days

---

### POST /api/admin/auth/logout
**Purpose**: Admin logout

**Response**:
```typescript
{
  success: true,
  message: "Logged out successfully"
}
```

**Side Effects**:
- Clear authentication cookie

---

### GET /api/admin/auth/me
**Purpose**: Get current user info

**Response**:
```typescript
{
  success: true,
  data: {
    email: string;
    role: 'developer' | 'admin';
  }
}
```

---

### GET /api/admin/contacts
**Purpose**: Get contact submissions

**Authentication**: Required (both roles)

**Query Parameters**:
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `isRead`: boolean (optional)
- `search`: string (optional)

**Response**:
```typescript
{
  success: true,
  data: ContactSubmission[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}
```

---

### PATCH /api/admin/contacts/[id]
**Purpose**: Update contact submission (mark as read/unread)

**Authentication**: Required (both roles)

**Request Body**:
```typescript
{
  isRead: boolean;
}
```

**Response**:
```typescript
{
  success: true,
  data: ContactSubmission
}
```

---

### DELETE /api/admin/contacts/[id]
**Purpose**: Delete contact submission

**Authentication**: Required (both roles)

**Response**:
```typescript
{
  success: true,
  message: "Contact deleted successfully"
}
```

**Side Effects**:
- Permanently delete contact from database

---

### GET /api/admin/data/services
**Purpose**: Get services for admin panel

**Authentication**: Required (developer only)

**Response**:
```typescript
{
  success: true,
  data: Service[]
}
```

---

### PUT /api/admin/data/services/[id]
**Purpose**: Update service

**Authentication**: Required (developer only)

**Request Body**: `Service` object

**Validation**: Validate against Service schema

**Response**:
```typescript
{
  success: true,
  data: Service
}
```

**Side Effects**:
- Update data/services.json
- Revalidate Next.js cache

---

### GET /api/admin/data/projects
**Purpose**: Get projects for admin panel

**Authentication**: Required (developer only)

**Response**:
```typescript
{
  success: true,
  data: Project[]
}
```

---

### PUT /api/admin/data/projects/[id]
**Purpose**: Update project

**Authentication**: Required (developer only)

**Request Body**: `Project` object

**Response**:
```typescript
{
  success: true,
  data: Project
}
```

**Side Effects**:
- Update data/projects.json
- Revalidate Next.js cache

---

### GET /api/admin/data/testimonials
**Purpose**: Get testimonials for admin panel

**Authentication**: Required (developer only)

**Response**:
```typescript
{
  success: true,
  data: Testimonial[]
}
```

---

### PUT /api/admin/data/testimonials/[id]
**Purpose**: Update testimonial

**Authentication**: Required (developer only)

**Request Body**: `Testimonial` object

**Response**:
```typescript
{
  success: true,
  data: Testimonial
}
```

**Side Effects**:
- Update data/testimonials.json
- Revalidate Next.js cache

---

### GET /api/admin/data/global
**Purpose**: Get global settings

**Authentication**: Required (developer only)

**Response**:
```typescript
{
  success: true,
  data: GlobalData
}
```

---

### PUT /api/admin/data/global
**Purpose**: Update global settings

**Authentication**: Required (developer only)

**Request Body**: `GlobalData` object

**Response**:
```typescript
{
  success: true,
  data: GlobalData
}
```

**Side Effects**:
- Update data/global.json
- Revalidate all pages

---

### POST /api/admin/upload
**Purpose**: Upload image

**Authentication**: Required (developer only)

**Request**: multipart/form-data with image file

**Validation**:
- Max size: 5MB
- Allowed formats: jpg, png, webp
- Max dimensions: 4000x4000

**Response**:
```typescript
{
  success: true,
  data: {
    url: string; // /images/uploads/filename.jpg
  }
}
```

**Side Effects**:
- Save file to public/images/uploads/
- Optimize image (resize, compress)

---

## Middleware

### Authentication Middleware
**File**: `middleware.ts`

**Purpose**: Protect admin routes

**Logic**:
```typescript
// Public routes: allow all
if (pathname.startsWith('/api/contact')) return next();

// Admin routes: check JWT token
if (pathname.startsWith('/api/admin')) {
  const token = cookies.get('auth_token');
  if (!token) return unauthorized();
  
  const user = verifyToken(token);
  if (!user) return unauthorized();
  
  // Check permissions
  if (pathname.includes('/data/') && user.role !== 'developer') {
    return forbidden();
  }
  
  return next();
}
```

---

## Error Handling

### Standard Error Responses
```typescript
// 400 Bad Request
{
  success: false,
  error: "Validation failed",
  details: { field: ["error message"] }
}

// 401 Unauthorized
{
  success: false,
  error: "Authentication required"
}

// 403 Forbidden
{
  success: false,
  error: "Insufficient permissions"
}

// 404 Not Found
{
  success: false,
  error: "Resource not found"
}

// 429 Too Many Requests
{
  success: false,
  error: "Rate limit exceeded. Please try again later."
}

// 500 Internal Server Error
{
  success: false,
  error: "An unexpected error occurred"
}
```

---

## Utility Functions

### lib/api-utils.ts
```typescript
// Response helpers
export const successResponse = <T>(data: T, message?: string) => ({
  success: true,
  data,
  message
});

export const errorResponse = (error: string, details?: any) => ({
  success: false,
  error,
  details
});

// Authentication
export const verifyAuth = (req: Request) => {
  const token = getCookie(req, 'auth_token');
  if (!token) throw new Error('Unauthorized');
  return verifyToken(token);
};

// Permission check
export const requirePermission = (user: AdminUser, permission: Permission) => {
  const permissions = rolePermissions[user.role];
  if (!permissions.includes(permission)) {
    throw new Error('Forbidden');
  }
};
```

### lib/rate-limit.ts
```typescript
// Simple in-memory rate limiter
const rateLimitMap = new Map<string, number[]>();

export const checkRateLimit = (
  identifier: string,
  limit: number,
  windowMs: number
): boolean => {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];
  
  // Remove old timestamps
  const validTimestamps = timestamps.filter(t => now - t < windowMs);
  
  if (validTimestamps.length >= limit) {
    return false;
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(identifier, validTimestamps);
  return true;
};
```
