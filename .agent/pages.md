# Page Specifications

## Homepage (`app/page.tsx`)

### Hero Section
**Height**: 100vh
**Background**: Video or high-quality image with dark overlay
**Content**:
- Logo (fade in)
- Main headline: "Crafting Timeless Spaces" (staggered word animation)
- Subheadline: Brief brand statement (fade in with delay)
- Two CTAs: "Explore Our Work" (primary) + "Get in Touch" (secondary)
- Scroll indicator (animated arrow)

**Animation Sequence**:
1. Logo fade in (0.5s delay)
2. Headline words stagger in (0.1s between words)
3. Subheadline fade in (1s delay)
4. CTAs slide up (1.2s delay)
5. Scroll indicator pulse (continuous)

---

### Featured Services Section
**Layout**: 3-column grid (1 column on mobile)
**Content**:
- Section title: "Our Expertise"
- 3 featured services
- "View All Services" link

**Service Cards**:
- Icon (animated on hover)
- Title
- Short description
- Hover: Scale + shadow effect
- Click: Navigate to service detail

---

### Featured Projects Section
**Layout**: Masonry grid or 2x2 grid
**Content**:
- Section title: "Selected Work"
- 4 featured projects
- "View All Projects" link

**Project Cards**:
- Cover image
- Overlay with title + category
- Hover: Image zoom, overlay fade in
- Click: Navigate to project detail

---

### Testimonials Section
**Layout**: Carousel/slider
**Content**:
- Section title: "What Our Clients Say"
- 3-5 testimonials rotating
- Navigation dots
- Auto-play (6s interval)

**Testimonial Card**:
- Quote icon
- Content
- Client name, role, company
- Star rating
- Client photo (optional)

---

### Call-to-Action Section
**Layout**: Full-width with background
**Content**:
- Headline: "Ready to Transform Your Space?"
- Subheadline: Brief invitation
- Primary CTA: "Start a Project"
- Secondary info: Contact email/phone

---

## About Page (`app/about/page.tsx`)

### Hero Section
**Layout**: Split screen (image + text)
**Content**:
- Page title: "About Pasha Interior"
- Brand statement
- Hero image

---

### Company Story Section
**Layout**: Text-focused with side images
**Content**:
- "Our Story" heading
- Company history and philosophy
- Founder information
- Timeline of milestones

---

### Values Section
**Layout**: Icon grid (3 columns)
**Content**:
- "Our Values" heading
- 3-6 value cards with icons
- Each card: Icon, title, description

---

### Team Section (Optional)
**Layout**: Grid of team members
**Content**:
- Photos
- Names and roles
- Brief bios

---

## Services Page (`app/services/page.tsx`)

### Hero Section
**Layout**: Centered text
**Content**:
- Page title: "Our Services"
- Brief description

---

### Services Grid
**Layout**: 2-column grid (1 on mobile)
**Content**:
- All services from services.json
- Filter by category (if applicable)

**Service Card**:
- Icon
- Title
- Short description
- "Learn More" link
- Hover effects

---

## Service Detail Page (`app/services/[slug]/page.tsx`)

### Hero Section
**Layout**: Full-width with image
**Content**:
- Service title
- Service image

---

### Overview Section
**Layout**: Two columns (text + image)
**Content**:
- Detailed description
- Key benefits list
- Process steps

---

### Gallery Section
**Layout**: Grid
**Content**:
- Service-related images
- Lightbox functionality

---

### Related Projects Section
**Layout**: Horizontal scroll or grid
**Content**:
- 3-4 related projects
- "View All Projects" link

---

### CTA Section
**Content**:
- "Interested in this service?"
- Contact button

---

## Projects Page (`app/projects/page.tsx`)

### Hero Section
**Layout**: Centered text
**Content**:
- Page title: "Our Projects"
- Brief description

---

### Filter Bar
**Layout**: Horizontal tabs or dropdown
**Content**:
- All categories
- "All" option
- Active state styling

---

### Projects Grid
**Layout**: Masonry or 3-column grid
**Content**:
- All projects (filtered)
- Infinite scroll or pagination

**Project Card**:
- Cover image
- Category badge
- Title
- Location + Year
- Hover: Overlay with details

---

## Project Detail Page (`app/projects/[slug]/page.tsx`)

### Hero Section
**Layout**: Full-width cover image
**Content**:
- Project title overlay
- Category + Year

---

### Project Info Section
**Layout**: Sidebar + main content
**Sidebar**:
- Client
- Location
- Year
- Area
- Services used
- Tags

**Main Content**:
- Project description
- Challenges
- Solution
- Scope of work

---

### Image Gallery
**Layout**: Grid with lightbox
**Content**:
- All project images
- Click to enlarge
- Navigation between images

---

### Related Projects Section
**Layout**: Horizontal scroll
**Content**:
- 3-4 similar projects
- Based on category or services

---

## Testimonials Page (`app/testimonials/page.tsx`)

### Hero Section
**Layout**: Centered text
**Content**:
- Page title: "Client Testimonials"
- Brief description

---

### Testimonials Grid
**Layout**: 2-column grid (1 on mobile)
**Content**:
- All testimonials
- Sorted by featured first, then date

**Testimonial Card**:
- Quote icon
- Content
- Client info
- Rating
- Photo
- Related project link (if applicable)

---

## Contact Page (`app/contact/page.tsx`)

### Hero Section
**Layout**: Centered text
**Content**:
- Page title: "Get in Touch"
- Brief invitation

---

### Contact Form Section
**Layout**: Two columns (form + info)

**Form**:
- Name field
- Email field
- Phone field (optional)
- Message textarea
- Submit button
- Loading state
- Success/error messages

**Contact Info**:
- Email
- Phone
- Address
- Social media links
- Business hours (optional)

---

### Map Section
**Layout**: Full-width
**Content**:
- Google Maps iframe
- URL from global.json

---

## Admin Panel Pages

### Login Page (`app/[adminUrl]/login/page.tsx`)

**Layout**: Centered card
**Content**:
- Logo
- "Admin Login" heading
- Email input
- Login button
- Simple, clean design

---

### Dashboard (`app/[adminUrl]/page.tsx`)

**Layout**: Grid of stat cards + recent activity

**Stats**:
- Total contact submissions
- Unread contacts
- Total services
- Total projects
- Total testimonials

**Recent Activity**:
- Last 5 contact submissions
- Quick actions

---

### Contacts Page (`app/[adminUrl]/contacts/page.tsx`)

**Layout**: Data table

**Features**:
- Search by name/email
- Filter by read/unread
- Sort by date
- Mark as read/unread
- Pagination
- Export to CSV

**Columns**:
- Name
- Email
- Phone
- Message (truncated)
- Date
- Status (read/unread)
- Actions

---

### Services Management (`app/[adminUrl]/services/page.tsx`)

**Layout**: List + edit form

**Features**:
- List all services
- Click to edit
- Form with all service fields
- Image upload
- Save/cancel
- Preview

---

### Projects Management (`app/[adminUrl]/projects/page.tsx`)

**Layout**: List + edit form

**Features**:
- List all projects
- Click to edit
- Form with all project fields
- Multiple image upload
- Gallery management
- Save/cancel
- Preview

---

### Testimonials Management (`app/[adminUrl]/testimonials/page.tsx`)

**Layout**: List + edit form

**Features**:
- List all testimonials
- Click to edit
- Form with all testimonial fields
- Image upload
- Save/cancel

---

### Settings Page (`app/[adminUrl]/settings/page.tsx`)

**Layout**: Tabbed interface

**Tabs**:
1. **Company Info**: Edit global.json company data
2. **Contact Details**: Edit contact information
3. **Social Media**: Edit social links
4. **Maps**: Configure Google Maps URL
5. **SEO**: Edit meta tags and keywords

**Features**:
- Form for each section
- Save button
- Success/error feedback
- Preview changes

---

## Responsive Breakpoints

### Mobile (< 768px)
- Single column layouts
- Stacked sections
- Hamburger menu
- Touch-friendly buttons
- Simplified animations

### Tablet (768px - 1024px)
- 2-column grids
- Adjusted spacing
- Hybrid navigation

### Desktop (> 1024px)
- Full multi-column layouts
- Hover effects
- Expanded navigation
- Optimal spacing

---

## SEO & Metadata

### All Pages
- Unique title tags
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD)

### Dynamic Pages (Services, Projects)
- Generated from content data
- Include relevant keywords
- Proper heading hierarchy
- Alt text for all images
