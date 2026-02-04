import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';

export interface AdminUser {
  email: string;
  role: 'developer' | 'admin';
}

export interface JWTPayload extends AdminUser {
  iat: number;
  exp: number;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT token for admin user
 */
export function generateToken(user: AdminUser): string {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '7d',
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const developerEmail = process.env.DEVELOPER_EMAIL;
  const developerPassword = process.env.DEVELOPER_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === developerEmail && password === developerPassword) {
    return { email, role: 'developer' };
  }

  if (email === adminEmail && password === adminPassword) {
    return { email, role: 'admin' };
  }

  return null;
}

/**
 * Check if user has permission
 */
export function hasPermission(
  user: AdminUser,
  permission: string
): boolean {
  const permissions: Record<string, string[]> = {
    developer: [
      'view_contacts',
      'delete_contacts',
      'manage_services',
      'manage_projects',
      'manage_testimonials',
      'manage_settings',
    ],
    admin: ['view_contacts', 'delete_contacts'],
  };

  return permissions[user.role]?.includes(permission) || false;
}
