# Pasha Interior - Design System Specification

## Color Palette

### Dark Theme (Base)
```css
--background: 10 10 12        /* #0A0A0C - Deep charcoal */
--foreground: 250 250 250     /* #FAFAFA - Soft white */
--card: 20 20 24              /* #141418 - Elevated surface */
--card-foreground: 245 245 245
--primary: 42 38 28           /* #2A261C - Warm dark gold */
--primary-foreground: 255 250 240
--accent: 184 134 11          /* #B8860B - Elegant gold */
--accent-foreground: 10 10 12
--muted: 30 30 34
--muted-foreground: 163 163 163
--border: 40 40 44
--ring: 184 134 11
```

### Light Sections (For Contrast)
```css
--light-section-bg: 245 245 245     /* #F5F5F5 - Soft gray */
--light-section-fg: 10 10 12        /* #0A0A0C - Deep text */
--light-card: 250 250 250           /* #FAFAFA - Subtle card */
--light-border: 229 229 229         /* #E5E5E5 - Light border */
```

Note: Light sections are used strategically for visual hierarchy and contrast within the dark theme, not as a separate theme mode.

## Typography

### Font Families
- **Headings**: 'Outfit', sans-serif (weights: 300, 400, 600, 700)
- **Body**: 'Inter', sans-serif (weights: 300, 400, 500, 600)
- **Accent**: 'Playfair Display', serif (for luxury quotes/statements)

### Type Scale
```css
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
--text-4xl: 2.25rem     /* 36px */
--text-5xl: 3rem        /* 48px */
--text-6xl: 3.75rem     /* 60px */
--text-7xl: 4.5rem      /* 72px */
```

## Spacing System
```css
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */
--spacing-3xl: 4rem     /* 64px */
--spacing-4xl: 6rem     /* 96px */
--spacing-5xl: 8rem     /* 128px */
```

## Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

## Border Radius
```css
--radius-sm: 0.25rem    /* 4px */
--radius-md: 0.5rem     /* 8px */
--radius-lg: 0.75rem    /* 12px */
--radius-xl: 1rem       /* 16px */
--radius-2xl: 1.5rem    /* 24px */
--radius-full: 9999px
```

## Animations

### Keyframes
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

### Transitions
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1)
```

## Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

## Component Patterns

### Button Variants
- **Primary**: Gold gradient with hover lift effect
- **Secondary**: Outlined with subtle fill on hover
- **Ghost**: Transparent with hover background
- **Link**: Text-only with underline animation

### Card Styles
- **Elevated**: Subtle shadow with hover lift
- **Glass**: Glassmorphism effect
- **Bordered**: Clean border with no shadow
- **Interactive**: Scale and shadow on hover

### Navigation
- **Desktop**: Horizontal with smooth underline indicators
- **Mobile**: Full-screen overlay with staggered animations
- **Scroll**: Glassmorphism background on scroll

## Responsive Breakpoints
```css
--screen-sm: 640px
--screen-md: 768px
--screen-lg: 1024px
--screen-xl: 1280px
--screen-2xl: 1536px
```

## Accessibility
- Minimum contrast ratio: 4.5:1 for normal text
- Focus indicators: 2px solid accent color
- Keyboard navigation: Full support
- ARIA labels: All interactive elements
- Screen reader: Semantic HTML structure
