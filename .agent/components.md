# Component Specifications

## Layout Components

### Header Component
**File**: `components/layout/header.tsx`

**Features**:
- Sticky navigation with glassmorphism on scroll
- Logo (SVG) with link to homepage
- Navigation links: Home, About, Services, Projects, Testimonials, Contact
- Mobile hamburger menu
- Smooth scroll to sections
- Active link highlighting

**Props**:
```typescript
interface HeaderProps {
  transparent?: boolean; // For homepage hero
}
```

**Behavior**:
- Desktop: Horizontal nav with hover underline animations
- Mobile: Full-screen overlay menu with staggered fade-in
- Scroll: Add backdrop blur and subtle shadow after 50px scroll
- Active state: Gold underline for current page

---

### Footer Component
**File**: `components/layout/footer.tsx`

**Features**:
- Company information from global.json
- Quick navigation links
- Social media icons
- Contact information
- Copyright notice
- Newsletter signup (optional)

**Layout**:
- 4-column grid on desktop
- Stacked on mobile
- Subtle top border
- Dark background in light mode, lighter in dark mode

---

## UI Components

### Button Component
**File**: `components/ui/button.tsx`

**Variants**:
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Styles**:
- **Primary**: Gold gradient background, white text, hover lift
- **Secondary**: Outlined with gold border, hover fill
- **Ghost**: Transparent, hover background
- **Outline**: Border only, subtle hover
- **Link**: Text only with underline animation

---

### Card Component
**File**: `components/ui/card.tsx`

**Variants**:
```typescript
type CardVariant = 'elevated' | 'glass' | 'bordered' | 'interactive';

interface CardProps {
  variant?: CardVariant;
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

**Features**:
- Smooth hover transitions
- Optional glassmorphism effect
- Responsive padding
- Dark/light theme support

---

### Section Component
**File**: `components/ui/section.tsx`

**Purpose**: Wrapper for page sections with consistent spacing and animations

**Props**:
```typescript
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}
```

**Features**:
- Fade-in animation on scroll (using Framer Motion)
- Consistent vertical padding
- Max-width container
- Responsive spacing

---

## Page-Specific Components

### Hero Section
**File**: `components/home/hero.tsx`

**Features**:
- Full-screen height
- Background video or image
- Overlay gradient
- Centered content
- Animated headline (staggered words)
- CTA buttons
- Scroll indicator

**Content**:
- Main headline: Company tagline
- Subheadline: Brief description
- Primary CTA: "Explore Our Work"
- Secondary CTA: "Get in Touch"

---

### Service Card
**File**: `components/services/service-card.tsx`

**Props**:
```typescript
interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}
```

**Features**:
- Icon display (Lucide icons)
- Title and short description
- Hover scale effect
- Link to service detail page
- Featured badge (if applicable)

---

### Project Card
**File**: `components/projects/project-card.tsx`

**Props**:
```typescript
interface ProjectCardProps {
  project: Project;
  layout?: 'grid' | 'masonry';
}
```

**Features**:
- Cover image with overlay
- Category badge
- Title and location
- Year display
- Hover reveal animation
- Link to project detail page

---

### Project Gallery
**File**: `components/projects/project-gallery.tsx`

**Props**:
```typescript
interface ProjectGalleryProps {
  images: string[];
  title: string;
}
```

**Features**:
- Grid layout
- Lightbox on click
- Keyboard navigation
- Swipe support on mobile
- Image lazy loading

---

### Testimonial Card
**File**: `components/testimonials/testimonial-card.tsx`

**Props**:
```typescript
interface TestimonialCardProps {
  testimonial: Testimonial;
}
```

**Features**:
- Quote icon
- Client photo (optional)
- Name, role, company
- Star rating
- Elegant card design

---

### Contact Form
**File**: `components/contact/contact-form.tsx`

**Fields**:
- Name (required)
- Email (required, validated)
- Phone (optional)
- Message (required, min 10 chars)

**Features**:
- Real-time validation (react-hook-form + zod)
- Loading state on submit
- Success/error messages
- Accessible error display
- Rate limiting (client-side)

**Validation Schema**:
```typescript
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
});
```

---

## Admin Panel Components

### Admin Layout
**File**: `components/admin/admin-layout.tsx`

**Features**:
- Sidebar navigation
- User info display
- Logout button
- Role-based menu items
- Mobile responsive

---

### Data Table
**File**: `components/admin/data-table.tsx`

**Props**:
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
}
```

**Features**:
- Sortable columns
- Search functionality
- Filters
- Pagination
- Row actions (edit, delete)
- Responsive (cards on mobile)

---

### JSON Editor
**File**: `components/admin/json-editor.tsx`

**Props**:
```typescript
interface JsonEditorProps {
  data: any;
  schema: z.ZodSchema;
  onSave: (data: any) => Promise<void>;
}
```

**Features**:
- Form fields generated from schema
- Real-time validation
- Preview mode
- Save/cancel actions
- Unsaved changes warning

---

### Image Upload
**File**: `components/admin/image-upload.tsx`

**Props**:
```typescript
interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  maxSize?: number; // in MB
  accept?: string[];
}
```

**Features**:
- Drag & drop
- Preview
- File size validation
- Format validation
- Progress indicator
- Delete option

---

## Shared Utilities

### Loading Skeleton
**File**: `components/ui/skeleton.tsx`

**Variants**:
- Text lines
- Card
- Image
- Avatar
- Custom shapes

**Features**:
- Shimmer animation
- Theme-aware colors
- Responsive sizing

---

### Error Boundary
**File**: `components/ui/error-boundary.tsx`

**Features**:
- Catch React errors
- Display friendly error message
- Retry button
- Report error (optional)
- Fallback UI

---

### Modal
**File**: `components/ui/modal.tsx`

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

**Features**:
- Backdrop blur
- Smooth open/close animation
- Click outside to close
- ESC key to close
- Focus trap
- Scroll lock

---

### Toast Notifications
**File**: `components/ui/toast.tsx`

**Types**:
- Success
- Error
- Warning
- Info

**Features**:
- Auto-dismiss (configurable)
- Stacking
- Swipe to dismiss
- Icon + message
- Action button (optional)

---

## Animation Patterns

### Page Transitions
```typescript
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  duration: 0.3,
  ease: 'easeInOut'
};
```

### Stagger Children
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### Hover Effects
```typescript
const cardHover = {
  scale: 1.02,
  y: -4,
  transition: { duration: 0.2 }
};

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.15 }
};
```
