# SVG Logo Design Specification

## Logo Concept
A sophisticated, minimalist logo for Pasha Interior that combines:
- Geometric elegance
- Interior design symbolism
- Luxury brand aesthetics
- Designed for dark theme background

## Design Elements

### Primary Logo (logo.svg)
**For Dark Theme (Light Logo on Dark Background)**

**Concept**: Stylized "PI" monogram with architectural elements

**Color**: `#B8860B` (Elegant gold) or `#FAFAFA` (Soft white)

**Structure**:
- Geometric letterforms with clean lines
- Subtle golden ratio proportions
- Minimal, modern aesthetic
- Optional: Subtle interior design element (e.g., doorway, window frame)

**Dimensions**: 
- Width: 200px
- Height: 60px
- Viewbox: 0 0 200 60

---

## Logo Variations

### 1. Full Logo with Text
```
[PI Icon] PASHA INTERIOR
```
- Icon on left
- Company name in Outfit font
- Used in header, footer

### 2. Icon Only
```
[PI Icon]
```
- Square format
- Used as favicon
- Used in mobile header when space is limited

### 3. Stacked Version
```
  [PI Icon]
PASHA INTERIOR
```
- Centered alignment
- Used in admin panel
- Used in loading screens

---

## Typography in Logo

**Font**: Outfit
**Weight**: 600 (Semi-bold)
**Letter Spacing**: 0.05em
**Case**: Uppercase for "PASHA INTERIOR"

---

## Usage Guidelines

### Minimum Size
- Full logo: 120px width
- Icon only: 32px width

### Clear Space
- Maintain clear space equal to height of "P" on all sides

### Color Variations
1. **Primary**: Gold/White on dark (#B8860B or #FAFAFA on #0A0A0C)
2. **Monochrome**: White only (for special cases)

### Don'ts
- Don't stretch or distort
- Don't change colors outside approved palette
- Don't add effects (shadows, glows, etc.)
- Don't place on busy backgrounds

---

## File Specifications

### logo.svg
```svg
<svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Logo design will be created here -->
  <!-- Geometric PI monogram with architectural elements -->
  <!-- Color: #B8860B (Elegant gold) -->
</svg>
```

### favicon.ico
- Generated from icon-only version
- Sizes: 16x16, 32x32, 48x48
- Format: ICO with PNG fallback

---

## Implementation Notes

1. **SVG Optimization**: 
   - Remove unnecessary metadata
   - Optimize paths
   - Keep file size < 5KB

2. **Responsive Behavior**:
   - Use CSS to swap between light/dark versions based on theme
   - Scale proportionally
   - Maintain aspect ratio

3. **Accessibility**:
   - Include `<title>` tag in SVG
   - Add `aria-label` when used as image
   - Ensure sufficient contrast

4. **Loading**:
   - Inline SVG in header for instant display
   - No external requests needed
   - Faster page load

---

## CSS Implementation

```css
.logo {
  width: auto;
  height: 40px;
  transition: opacity 0.3s ease;
}

.logo:hover {
  opacity: 0.8;
}
```

Note: No theme switching needed since website uses dark theme only.

---

## Alternative Concept (If Preferred)

**Concept 2**: Abstract interior space
- Minimalist line drawing of a room corner
- Golden ratio proportions
- Negative space forming "PI"
- More architectural, less typographic

**Concept 3**: Luxury monogram
- Ornate "P" and "I" intertwined
- Art deco influence
- Elegant serif elements
- More traditional luxury aesthetic

---

## Deliverables

1. `public/logo.svg` - Primary logo (for dark theme)
2. `public/favicon.ico` - Favicon
3. `public/logo-icon.svg` - Icon only version
4. `public/apple-touch-icon.png` - 180x180 for iOS
5. `public/android-chrome-192x192.png` - For Android
6. `public/android-chrome-512x512.png` - For Android

---

## Brand Colors Reference

**Primary Dark**: `#2A261C` (Warm charcoal)
**Accent Gold**: `#B8860B` (Elegant gold)
**Background Dark**: `#0A0A0C` (Deep charcoal)
**Background Light**: `#FFFFFF` (Pure white)

---

## Next Steps

1. Create logo.svg with geometric PI monogram (gold/white for dark background)
2. Generate favicon and app icons
3. Test on dark theme
4. Verify responsive behavior
5. Ensure accessibility compliance
