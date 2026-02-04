import { GlobalData, Service, Project, Testimonial } from '@/types';

// Bundled JSON data for client-side and server-side reading
import globalData from '@/data/global.json';
import servicesData from '@/data/services.json';
import projectsData from '@/data/projects.json';
import testimonialsData from '@/data/testimonials.json';

/**
 * Get global data
 */
export function getGlobalData(): GlobalData {
  return globalData as unknown as GlobalData;
}

/**
 * Get services data
 */
export function getServices(): Service[] {
  return servicesData as unknown as Service[];
}

/**
 * Get projects data
 */
export function getProjects(): Project[] {
  return projectsData as unknown as Project[];
}

/**
 * Get testimonials data
 */
export function getTestimonials(): Testimonial[] {
  return testimonialsData as unknown as Testimonial[];
}

/**
 * Write JSON file to data directory (Server-side only)
 */
async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  if (typeof window !== 'undefined') return;
  
  const fs = await import('fs');
  const path = await import('path');
  const filePath = path.join(process.cwd(), 'data', filename);
  const fileContent = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, fileContent, 'utf-8');
}

/**
 * Update services data
 */
export async function updateServices(data: Service[]): Promise<void> {
  await writeJsonFile('services.json', data);
}

/**
 * Update projects data
 */
export async function updateProjects(data: Project[]): Promise<void> {
  await writeJsonFile('projects.json', data);
}

/**
 * Update testimonials data
 */
export async function updateTestimonials(data: Testimonial[]): Promise<void> {
  await writeJsonFile('testimonials.json', data);
}

/**
 * Update global data
 */
export async function updateGlobalData(data: GlobalData): Promise<void> {
  await writeJsonFile('global.json', data);
}
