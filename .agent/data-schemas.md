# Data Schemas & Types

## TypeScript Interfaces

### Global Data
```typescript
interface GlobalData {
  company: {
    name: string;
    tagline: string;
    description: string;
    founded: string;
    philosophy: string;
  };
  contact: {
    email: string;              // Public contact email (NOT developer email)
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
  };
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    pinterest?: string;
  };
  maps: {
    iframeUrl: string;
    latitude?: number;
    longitude?: number;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
}
```

### Services
```typescript
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string; // Lucide icon name
  featured: boolean;
  order: number;
  details: {
    overview: string;
    process: string[];
    benefits: string[];
    duration?: string;
  };
  image: string;
  gallery?: string[];
  relatedProjects?: string[]; // Project IDs
  createdAt: string;
  updatedAt: string;
}
```

### Projects
```typescript
interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Retail' | 'Office';
  year: string;
  location: string;
  client?: string;
  description: string;
  shortDescription: string;
  featured: boolean;
  order: number;
  coverImage: string;
  images: string[];
  details: {
    area?: string;
    budget?: string;
    duration?: string;
    scope: string[];
    challenges?: string;
    solution?: string;
  };
  services: string[]; // Service IDs
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Testimonials
```typescript
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image?: string;
  projectId?: string; // Related project
  featured: boolean;
  order: number;
  createdAt: string;
}
```

### Contact Submission
```typescript
interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  ipAddress?: string;
  userAgent?: string;
}
```

### Admin User
```typescript
interface AdminUser {
  email: string;
  password: string;           // Hashed password from env
  role: 'developer' | 'admin';
  name?: string;
  lastLogin?: string;
}

type Permission = 
  | 'view_contacts'
  | 'delete_contacts'         // Both roles can delete
  | 'manage_services'
  | 'manage_projects'
  | 'manage_testimonials'
  | 'manage_settings';

const rolePermissions: Record<AdminUser['role'], Permission[]> = {
  developer: [
    'view_contacts',
    'delete_contacts',
    'manage_services',
    'manage_projects',
    'manage_testimonials',
    'manage_settings'
  ],
  admin: [
    'view_contacts',
    'delete_contacts'           // Admin can now delete contacts
  ]
};
```

## Database Schema (SQLite)

### contacts Table
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_is_read ON contacts(is_read);
```

## JSON File Structure

### data/global.json
```json
{
  "company": {
    "name": "Pasha Interior",
    "tagline": "Crafting Timeless Spaces",
    "description": "A luxury interior design studio dedicated to creating exceptional spaces that reflect sophistication and timeless elegance.",
    "founded": "2020",
    "philosophy": "We believe in the power of thoughtful design to transform spaces into experiences. Every project is a unique journey of discovery, creativity, and meticulous attention to detail."
  },
  "contact": {
    "email": "contact@pashainterior.com",
    "phone": "+91 1234567890",
    "address": {
      "street": "123 Design Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "postalCode": "400001"
    }
  },
  "social": {
    "instagram": "https://instagram.com/pashainterior",
    "facebook": "https://facebook.com/pashainterior",
    "linkedin": "https://linkedin.com/company/pashainterior"
  },
  "maps": {
    "iframeUrl": "https://www.google.com/maps/embed?pb=..."
  },
  "seo": {
    "title": "Pasha Interior - Luxury Interior Design Studio",
    "description": "Crafting timeless spaces with sophisticated design and meticulous attention to detail.",
    "keywords": ["interior design", "luxury interiors", "residential design", "commercial design", "Mumbai interior designer"],
    "ogImage": "/images/og-image.jpg"
  }
}
```

### data/services.json
```json
[
  {
    "id": "residential-design",
    "title": "Residential Design",
    "slug": "residential-design",
    "description": "Transform your living spaces into personalized sanctuaries that reflect your unique style and elevate your everyday life.",
    "shortDescription": "Personalized luxury living spaces",
    "icon": "Home",
    "featured": true,
    "order": 1,
    "details": {
      "overview": "Our residential design service...",
      "process": [
        "Initial consultation and vision discovery",
        "Concept development and mood boards",
        "Detailed design and material selection",
        "Project execution and styling"
      ],
      "benefits": [
        "Personalized design tailored to your lifestyle",
        "Seamless project management",
        "Access to exclusive materials and furnishings",
        "Timeless aesthetic with lasting value"
      ],
      "duration": "3-6 months"
    },
    "image": "/images/services/residential.jpg",
    "gallery": [
      "/images/services/residential-1.jpg",
      "/images/services/residential-2.jpg"
    ],
    "relatedProjects": ["modern-villa", "penthouse-suite"],
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
]
```

### data/projects.json
```json
[
  {
    "id": "modern-villa",
    "title": "Modern Villa Transformation",
    "slug": "modern-villa",
    "category": "Residential",
    "year": "2025",
    "location": "Mumbai, India",
    "client": "Private Client",
    "description": "A complete transformation of a contemporary villa, blending minimalist aesthetics with warm, inviting spaces.",
    "shortDescription": "Contemporary elegance meets comfort",
    "featured": true,
    "order": 1,
    "coverImage": "/images/projects/villa-cover.jpg",
    "images": [
      "/images/projects/villa-1.jpg",
      "/images/projects/villa-2.jpg",
      "/images/projects/villa-3.jpg"
    ],
    "details": {
      "area": "5,000 sq ft",
      "budget": "Confidential",
      "duration": "6 months",
      "scope": [
        "Complete interior redesign",
        "Custom furniture design",
        "Lighting design",
        "Art curation"
      ],
      "challenges": "Balancing modern aesthetics with family-friendly functionality",
      "solution": "Created distinct zones that flow seamlessly while maintaining visual cohesion"
    },
    "services": ["residential-design"],
    "tags": ["modern", "minimalist", "luxury", "villa"],
    "createdAt": "2025-01-15T00:00:00Z",
    "updatedAt": "2025-01-15T00:00:00Z"
  }
]
```

### data/testimonials.json
```json
[
  {
    "id": "1",
    "name": "Rajesh Kumar",
    "role": "CEO",
    "company": "Tech Innovations Ltd",
    "content": "Pasha Interior transformed our office into a space that truly reflects our brand. The attention to detail and understanding of our vision was exceptional.",
    "rating": 5,
    "image": "/images/testimonials/client-1.jpg",
    "projectId": "tech-office",
    "featured": true,
    "order": 1,
    "createdAt": "2025-01-20T00:00:00Z"
  }
]
```

## API Response Types

### Success Response
```typescript
interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}
```

### Error Response
```typescript
interface ApiError {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}
```

### Paginated Response
```typescript
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```
