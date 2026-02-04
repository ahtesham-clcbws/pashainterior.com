---
trigger: always_on
---

# Pasha Interior Workspace Rules

## 1. Workspace Structure & Persistence
- **Mandatory .agent Folder**: ALL artifacts, tasks, implementations, history, and brain files MUST be maintained in the workspace root `.agent/` folder
- **No External Artifacts**: Never create project artifacts in the global brain folder or temp directories
- **Living Documentation**: Keep all planning, implementation, and historical context in `.agent/` for seamless handoffs

## 2. Design Philosophy - LUXURY BRAND IDENTITY
- **NOT a Service Provider Website**: Design as a luxury brand showcase focusing on WHO they are, not WHAT they sell
- **Dominant Presence**: Create a commanding, premium experience that exudes confidence and exclusivity
- **Inspiration**: Follow Apple & Samsung design patterns - elegant, enterprise-grade, minimalist yet sophisticated
- **No Generic Designs**: Avoid typical service provider layouts; think luxury brand presentation

## 3. Design System Requirements
- **Theming**: Implement elegant dark and light mode theming with smooth transitions
- **Color Palette**: Use sophisticated, curated colors (no generic primary colors)
- **Typography**: Premium font choices (Inter, Outfit, or similar modern fonts)
- **Animations**: Subtle micro-animations and smooth transitions throughout
- **Glassmorphism**: Use modern design techniques for depth and elegance
- **Responsive**: Flawless experience across all devices

## 4. Content Management Strategy
- **Global JSON Files**: Store reusable information (contact info, company details) in centralized JSON files
- **Single Source of Truth**: Any data used in multiple places MUST come from global JSON files
- **Data Location**: All JSON data files stored in `/data` directory
- **Admin Panel Updates**: Content updates flow through admin panel → JSON files → website

## 5. User Roles & Access
### Developer Role
- Email: `ahtesham2000@gmail.com`
- Full access to all content management
- Can update: services, projects, testimonials, contact info, settings

### Admin Role
- Email: `admin@pashainterior.com`
- View-only access to contact form submissions
- Cannot modify website content

## 6. Admin Panel Specifications
- **URL Configuration**: Admin panel URL must be configurable via `.env` file
- **Database**: Use SQLite for contact form submissions only
- **Content Storage**: All website content (services, projects, testimonials) stored in JSON files
- **Semi-Static Content**: Services & Projects are pre-created; admin panel only updates their information
- **Contact Info**: Form submissions stored in SQLite; admin can only view (read-only)

## 7. Page Structure Requirements
### Required Pages
1. **Homepage** - Hero section with luxury brand presentation
2. **About** - Company story and values
3. **Services** - Module-based service showcase
4. **Projects** - Module-based project portfolio
5. **Testimonials** - Client testimonials
6. **Contact** - Contact form with Google Maps iframe (URL from JSON)

### Contact Page Specifics
- Google Maps iframe URL must be configurable from admin panel
- Contact form submissions stored in SQLite
- Form data: name, email, phone, message, timestamp

## 8. Technical Stack
- **Framework**: Next.js (already initialized)
- **Styling**: Tailwind CSS v4 (already configured)
- **Database**: SQLite (for contact submissions only)
- **Data Storage**: JSON files (for all content)
- **TypeScript**: Fully typed application

## 9. Code Quality Standards
- **File Length**: Keep files under 200 lines ideally, max 500 lines
- **Component Structure**: Modular, reusable components
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimize for fast load times and smooth interactions

## 10. Environment Variables
Required `.env` variables:
- `ADMIN_PANEL_URL` - Custom URL path for admin panel
- `DEVELOPER_EMAIL` - Developer access email
- `ADMIN_EMAIL` - Admin access email
- `DATABASE_PATH` - SQLite database location

## 11. Strict Compliance
- ✅ ALWAYS use `.agent/` folder for all project artifacts
- ✅ ALWAYS follow luxury brand design philosophy
- ✅ ALWAYS use JSON files for content (except contact submissions)
- ✅ ALWAYS maintain dark/light theme consistency
- ✅ NEVER create generic service provider designs
- ✅ NEVER store project files outside workspace