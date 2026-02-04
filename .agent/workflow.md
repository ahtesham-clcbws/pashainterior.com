# Development Workflow & Guidelines

## Phase-by-Phase Implementation

### Phase 1: Foundation Setup (Estimated: 2-3 hours)
**Goal**: Set up project dependencies, environment, and core infrastructure

**Tasks**:
1. Install dependencies
   ```bash
   npm install framer-motion next-themes better-sqlite3 react-hook-form zod lucide-react date-fns
   npm install -D @types/better-sqlite3
   ```

2. Create `.env.local` with required variables

3. Set up TypeScript path aliases in `tsconfig.json`
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"],
         "@/components/*": ["components/*"],
         "@/lib/*": ["lib/*"],
         "@/types/*": ["types/*"]
       }
     }
   }
   ```

4. Create directory structure
   ```bash
   mkdir -p components/{layout,ui,home,services,projects,testimonials,contact,admin}
   mkdir -p lib types data public/images/{hero,services,projects,testimonials,uploads}
   ```

5. Initialize SQLite database with schema

**Verification**:
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Directory structure created
- [ ] Database initialized
- [ ] TypeScript compiles without errors

---

### Phase 2: Design System (Estimated: 3-4 hours)
**Goal**: Implement core design system and theme infrastructure

**Tasks**:
1. Update `app/globals.css` with:
   - CSS custom properties for colors
   - Typography system
   - Spacing utilities
   - Animation keyframes
   - Glassmorphism utilities

2. Set up Google Fonts in `app/layout.tsx`
   ```typescript
   import { Inter, Outfit, Playfair_Display } from 'next/font/google';
   ```

3. Create theme provider (`components/ui/theme-provider.tsx`)

4. Create theme toggle (`components/ui/theme-toggle.tsx`)

5. Create base UI components:
   - Button
   - Card
   - Section
   - Modal
   - Toast
   - Skeleton

**Verification**:
- [ ] Theme toggle works smoothly
- [ ] Colors match design system
- [ ] Fonts load correctly
- [ ] UI components render properly
- [ ] Animations are smooth

---

### Phase 3: Data Layer (Estimated: 2-3 hours)
**Goal**: Set up data management and utilities

**Tasks**:
1. Create TypeScript types in `/types`
   - global.ts
   - service.ts
   - project.ts
   - testimonial.ts
   - contact.ts
   - admin.ts

2. Create JSON data files in `/data`
   - global.json (with sample data)
   - services.json (2-3 sample services)
   - projects.json (2-3 sample projects)
   - testimonials.json (2-3 sample testimonials)

3. Create utility functions in `/lib`
   - db.ts (SQLite operations)
   - data.ts (JSON file operations)
   - api-utils.ts (API helpers)
   - auth.ts (JWT utilities)
   - validation.ts (Zod schemas)

**Verification**:
- [ ] Types compile correctly
- [ ] JSON files are valid
- [ ] Can read from JSON files
- [ ] Can write to JSON files
- [ ] Database operations work
- [ ] Validation schemas work

---

### Phase 4: Logo & Branding (Estimated: 1-2 hours)
**Goal**: Create and implement logo assets

**Tasks**:
1. Design primary logo SVG (logo.svg)
2. Create dark theme variant (logo-dark.svg)
3. Generate favicon and app icons
4. Test logo in both themes
5. Implement logo in header component

**Verification**:
- [ ] Logo displays correctly
- [ ] Theme switching works
- [ ] Favicon appears in browser
- [ ] Logo is accessible
- [ ] SVG is optimized

---

### Phase 5: Layout Components (Estimated: 2-3 hours)
**Goal**: Build header and footer

**Tasks**:
1. Create Header component
   - Navigation links
   - Logo integration
   - Theme toggle
   - Mobile menu
   - Scroll behavior

2. Create Footer component
   - Company info from global.json
   - Navigation links
   - Social media links
   - Copyright

3. Update root layout to include Header and Footer

**Verification**:
- [ ] Header is sticky
- [ ] Navigation works
- [ ] Mobile menu functions
- [ ] Footer displays correctly
- [ ] Links are functional

---

### Phase 6: Homepage (Estimated: 4-5 hours)
**Goal**: Build complete homepage

**Tasks**:
1. Hero section
2. Featured services section
3. Featured projects section
4. Testimonials carousel
5. CTA section

**Verification**:
- [ ] All sections render
- [ ] Animations work
- [ ] Responsive on all devices
- [ ] Data loads from JSON
- [ ] Links navigate correctly

---

### Phase 7: Public Pages (Estimated: 6-8 hours)
**Goal**: Build all public-facing pages

**Tasks**:
1. About page
2. Services listing page
3. Service detail page
4. Projects listing page
5. Project detail page
6. Testimonials page
7. Contact page with form

**Verification**:
- [ ] All pages accessible
- [ ] Dynamic routes work
- [ ] Forms validate
- [ ] Responsive design
- [ ] SEO metadata present

---

### Phase 8: API Routes (Estimated: 4-5 hours)
**Goal**: Implement all API endpoints

**Tasks**:
1. Public APIs:
   - GET /api/services
   - GET /api/services/[slug]
   - GET /api/projects
   - GET /api/projects/[slug]
   - GET /api/testimonials
   - GET /api/global
   - POST /api/contact

2. Admin APIs:
   - POST /api/admin/auth/login
   - POST /api/admin/auth/logout
   - GET /api/admin/auth/me
   - GET /api/admin/contacts
   - PATCH /api/admin/contacts/[id]
   - GET/PUT /api/admin/data/services
   - GET/PUT /api/admin/data/projects
   - GET/PUT /api/admin/data/testimonials
   - GET/PUT /api/admin/data/global
   - POST /api/admin/upload

3. Create middleware for authentication

**Verification**:
- [ ] All endpoints respond
- [ ] Authentication works
- [ ] Authorization enforced
- [ ] Data validation works
- [ ] Error handling proper
- [ ] Rate limiting active

---

### Phase 9: Admin Panel (Estimated: 6-8 hours)
**Goal**: Build complete admin panel

**Tasks**:
1. Admin layout and navigation
2. Login page
3. Dashboard
4. Contacts management
5. Services management
6. Projects management
7. Testimonials management
8. Settings page

**Verification**:
- [ ] Login works for both roles
- [ ] Developer has full access
- [ ] Admin has limited access
- [ ] CRUD operations work
- [ ] File uploads work
- [ ] Changes reflect on frontend

---

### Phase 10: Polish & Optimization (Estimated: 3-4 hours)
**Goal**: Final touches and optimization

**Tasks**:
1. Add loading states
2. Implement error boundaries
3. Optimize images
4. Add meta tags for SEO
5. Implement accessibility features
6. Add smooth transitions
7. Test all animations
8. Cross-browser testing

**Verification**:
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Accessibility audit passes
- [ ] Works in all major browsers
- [ ] Mobile experience smooth

---

### Phase 11: Testing & Documentation (Estimated: 2-3 hours)
**Goal**: Comprehensive testing and documentation

**Tasks**:
1. Test all user flows
2. Test admin panel thoroughly
3. Create README.md
4. Document environment variables
5. Create deployment guide
6. Test production build

**Verification**:
- [ ] All features work
- [ ] No bugs found
- [ ] Documentation complete
- [ ] Production build successful
- [ ] Ready for deployment

---

## Development Best Practices

### Code Organization
- Keep components under 200 lines
- One component per file
- Colocate related components
- Use TypeScript strictly
- Follow naming conventions

### Git Workflow
```bash
# Feature branches
git checkout -b feature/homepage
git checkout -b feature/admin-panel

# Commit messages
git commit -m "feat: add hero section to homepage"
git commit -m "fix: resolve theme toggle issue"
git commit -m "refactor: optimize image loading"
```

### Performance
- Use Next.js Image component
- Lazy load images
- Code splitting for admin panel
- Minimize bundle size
- Use server components where possible

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support

### Testing Checklist
- [ ] Light/dark theme toggle
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Form validation
- [ ] Error states
- [ ] Loading states
- [ ] Navigation
- [ ] API endpoints
- [ ] Authentication
- [ ] File uploads
- [ ] Data persistence

---

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npx tsc --noEmit

# Database reset (if needed)
rm data/contacts.db
node scripts/init-db.js
```

---

## Troubleshooting

### Issue: Theme not switching
**Solution**: Check theme provider is wrapping app, verify CSS custom properties

### Issue: Database locked
**Solution**: Close all connections, restart dev server

### Issue: Images not loading
**Solution**: Verify paths are correct, check Next.js Image configuration

### Issue: API routes 404
**Solution**: Verify route file naming, check middleware isn't blocking

### Issue: Build fails
**Solution**: Run type check, fix TypeScript errors, verify all imports

---

## Deployment Checklist

- [ ] Environment variables set
- [ ] Database initialized
- [ ] JSON files populated with real data
- [ ] Images optimized
- [ ] Build successful
- [ ] No console errors
- [ ] Performance tested
- [ ] SEO verified
- [ ] Analytics added (optional)
- [ ] Domain configured

---

## Estimated Total Time

**Total**: 35-50 hours

**Breakdown**:
- Foundation: 2-3 hours
- Design System: 3-4 hours
- Data Layer: 2-3 hours
- Logo: 1-2 hours
- Layout: 2-3 hours
- Homepage: 4-5 hours
- Public Pages: 6-8 hours
- API Routes: 4-5 hours
- Admin Panel: 6-8 hours
- Polish: 3-4 hours
- Testing: 2-3 hours

**Note**: Times are estimates for an experienced developer. Adjust based on skill level and familiarity with the stack.
