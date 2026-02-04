// Global Data Types
export interface GlobalData {
  company: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    founded: string;
    proprietor: string;
    philosophy: string;
  };
  contact: {
    email: string;
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
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  maps: {
    iframeUrl: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
}

// Service Types
export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  featured: boolean;
  features: string[];
  process: string[];
}

// Project Types
export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  coverImage: string;
  images: string[];
  galleryImages?: string[];
  sliderImages?: string[];
  description: string;
  featured: boolean;
  services: string[];
  area?: string;
  duration?: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  rating: number;
  text: string;
  date: string;
  projectType?: string;
}

// Contact Submission Types
export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: number;
  createdAt: string;
  ip_address?: string;
  user_agent?: string;
}

// Admin User Types
export interface AdminUser {
  email: string;
  role: 'developer' | 'admin';
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
