# Project File Structure

```
pasha-interior/
├── .agent/                          # Workspace brain & documentation
│   ├── rules/
│   │   └── workspace.md            # Workspace-specific rules
│   ├── task.md                     # Task breakdown
│   ├── design-system.md            # Design system spec
│   ├── data-schemas.md             # Data schemas & types
│   ├── components.md               # Component specifications
│   ├── api-routes.md               # API documentation
│   ├── pages.md                    # Page specifications
│   └── file-structure.md           # This file
│
├── app/                            # Next.js app directory
│   ├── layout.tsx                  # Root layout with theme provider
│   ├── page.tsx                    # Homepage
│   ├── globals.css                 # Global styles & Tailwind config
│   │
│   ├── about/
│   │   └── page.tsx               # About page
│   │
│   ├── services/
│   │   ├── page.tsx               # Services listing
│   │   └── [slug]/
│   │       └── page.tsx           # Service detail
│   │
│   ├── projects/
│   │   ├── page.tsx               # Projects listing
│   │   └── [slug]/
│   │       └── page.tsx           # Project detail
│   │
│   ├── testimonials/
│   │   └── page.tsx               # Testimonials page
│   │
│   ├── contact/
│   │   └── page.tsx               # Contact page
│   │
│   ├── [adminUrl]/                # Dynamic admin panel route
│   │   ├── layout.tsx             # Admin layout
│   │   ├── page.tsx               # Admin dashboard
│   │   ├── login/
│   │   │   └── page.tsx           # Admin login
│   │   ├── contacts/
│   │   │   └── page.tsx           # Contact submissions
│   │   ├── services/
│   │   │   └── page.tsx           # Services management
│   │   ├── projects/
│   │   │   └── page.tsx           # Projects management
│   │   ├── testimonials/
│   │   │   └── page.tsx           # Testimonials management
│   │   └── settings/
│   │       └── page.tsx           # Settings
│   │
│   └── api/                       # API routes
│       ├── contact/
│       │   └── route.ts           # Contact form submission
│       ├── services/
│       │   ├── route.ts           # Get all services
│       │   └── [slug]/
│       │       └── route.ts       # Get single service
│       ├── projects/
│       │   ├── route.ts           # Get all projects
│       │   └── [slug]/
│       │       └── route.ts       # Get single project
│       ├── testimonials/
│       │   └── route.ts           # Get all testimonials
│       ├── global/
│       │   └── route.ts           # Get global data
│       └── admin/
│           ├── auth/
│           │   ├── login/
│           │   │   └── route.ts   # Admin login
│           │   ├── logout/
│           │   │   └── route.ts   # Admin logout
│           │   └── me/
│           │       └── route.ts   # Get current user
│           ├── contacts/
│           │   ├── route.ts       # Get all contacts
│           │   └── [id]/
│           │       └── route.ts   # Update contact
│           ├── data/
│           │   ├── services/
│           │   │   ├── route.ts   # Get/update all services
│           │   │   └── [id]/
│           │   │       └── route.ts # Update single service
│           │   ├── projects/
│           │   │   ├── route.ts   # Get/update all projects
│           │   │   └── [id]/
│           │   │       └── route.ts # Update single project
│           │   ├── testimonials/
│           │   │   ├── route.ts   # Get/update all testimonials
│           │   │   └── [id]/
│           │   │       └── route.ts # Update single testimonial
│           │   └── global/
│           │       └── route.ts   # Get/update global data
│           └── upload/
│               └── route.ts       # Image upload
│
├── components/                    # React components
│   ├── layout/
│   │   ├── header.tsx            # Site header
│   │   └── footer.tsx            # Site footer
│   │
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── section.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── modal.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   └── error-boundary.tsx
│   │
│   ├── home/                     # Homepage components
│   │   ├── hero.tsx
│   │   ├── featured-services.tsx
│   │   ├── featured-projects.tsx
│   │   └── testimonials-carousel.tsx
│   │
│   ├── services/                 # Services components
│   │   ├── service-card.tsx
│   │   └── service-grid.tsx
│   │
│   ├── projects/                 # Projects components
│   │   ├── project-card.tsx
│   │   ├── project-grid.tsx
│   │   ├── project-gallery.tsx
│   │   └── project-filter.tsx
│   │
│   ├── testimonials/             # Testimonials components
│   │   └── testimonial-card.tsx
│   │
│   ├── contact/                  # Contact components
│   │   ├── contact-form.tsx
│   │   └── contact-info.tsx
│   │
│   └── admin/                    # Admin panel components
│       ├── admin-layout.tsx
│       ├── admin-nav.tsx
│       ├── data-table.tsx
│       ├── json-editor.tsx
│       ├── image-upload.tsx
│       └── stat-card.tsx
│
├── lib/                          # Utility functions
│   ├── db.ts                     # SQLite database utilities
│   ├── data.ts                   # JSON data utilities
│   ├── api-utils.ts              # API helper functions
│   ├── rate-limit.ts             # Rate limiting
│   ├── auth.ts                   # Authentication utilities
│   ├── validation.ts             # Zod schemas
│   └── utils.ts                  # General utilities
│
├── types/                        # TypeScript type definitions
│   ├── global.ts                 # Global data types
│   ├── service.ts                # Service types
│   ├── project.ts                # Project types
│   ├── testimonial.ts            # Testimonial types
│   ├── contact.ts                # Contact types
│   └── admin.ts                  # Admin types
│
├── data/                         # JSON data files
│   ├── global.json               # Global site data
│   ├── services.json             # Services data
│   ├── projects.json             # Projects data
│   ├── testimonials.json         # Testimonials data
│   └── contacts.db               # SQLite database
│
├── public/                       # Static assets
│   ├── logo.svg                  # Main logo (light theme)
│   ├── logo-dark.svg             # Dark theme logo
│   ├── favicon.ico               # Favicon
│   │
│   ├── images/
│   │   ├── hero/                 # Hero section images
│   │   ├── services/             # Service images
│   │   ├── projects/             # Project images
│   │   ├── testimonials/         # Client photos
│   │   ├── uploads/              # Admin uploaded images
│   │   └── og-image.jpg          # Open Graph image
│   │
│   └── videos/                   # Video assets (optional)
│       └── hero-bg.mp4           # Hero background video
│
├── middleware.ts                 # Next.js middleware (auth)
├── .env.local                    # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

## File Count Estimates

### Total Files: ~120-140 files

**Breakdown**:
- App routes: ~25 files
- Components: ~30 files
- API routes: ~20 files
- Lib utilities: ~8 files
- Types: ~6 files
- Data files: ~5 files
- Config files: ~8 files
- Documentation (.agent): ~8 files
- Public assets: ~30-50 files (images, logos, etc.)

## Key Directories

### `/app`
Next.js App Router pages and layouts. Each page is a `page.tsx` file in its respective directory.

### `/components`
Organized by feature/domain. Shared UI components in `/ui`, page-specific components in their own folders.

### `/lib`
Business logic, utilities, and helper functions. No React components here.

### `/types`
TypeScript type definitions and interfaces. Centralized type system.

### `/data`
JSON files for content storage. SQLite database for contact submissions.

### `/public`
Static assets served directly. Images organized by category.

### `/.agent`
Workspace brain - all planning, documentation, and task tracking. NOT deployed to production.

## Important Notes

1. **Dynamic Admin URL**: The admin panel route uses `[adminUrl]` to allow configuration via environment variable.

2. **JSON Data Files**: All content (services, projects, testimonials, global) stored in JSON for easy editing via admin panel.

3. **SQLite Database**: Only for contact form submissions. Lightweight, no external database needed.

4. **Type Safety**: Full TypeScript coverage with centralized type definitions.

5. **Component Organization**: Components grouped by feature, not by type (e.g., `components/services/` not `components/cards/`).

6. **API Routes**: RESTful structure with clear separation between public and admin endpoints.

7. **Asset Organization**: Images organized by category in `/public/images/` for easy management.

8. **Documentation**: All planning and specs in `/.agent/` folder, following workspace rules.
