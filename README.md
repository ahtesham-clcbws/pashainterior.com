# Pasha Interior | Luxury Design Studio

A premium, enterprise-grade digital showcase for **Pasha Interior**, a luxury architectural and interior design brand. This application is designed to exude exclusivity, confidence, and sophisticated minimalism, following design patterns similar to Apple and Samsung.

## ✨ Core Philosophy
*   **Luxury Brand Identity**: This is not just a service provider website; it's a high-end brand presentation.
*   **Dominant Presence**: Elegant, immersive experience with a focus on visual excellence.
*   **Minimalist Sophistication**: Clean layouts, premium typography (Outfit/Inter), and smooth micro-animations.

## 🚀 Technology Stack
*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Modern design tokens/utilities)
*   **Database**: [SQLite](https://www.sqlite.org/) (Form submissions & inquiries)
*   **Data Strategy**: Centralized [JSON](file:///h:/PashaInterior/pasha-interior/data) files for global content management
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🏛️ Project Structure
```bash
├── app/                  # Next.js App Router (Studio & Public)
│   ├── studio/           # Administrative Command Center
│   └── (public)/         # Luxury Brand Showcase
├── components/           # Reusable UI Architecture
│   ├── admin/            # Custom Admin UX Components
│   └── ui/               # Primary Design System Elements
├── data/                 # Centralized Content Repository (JSON)
├── lib/                  # Backend & Database Logic
├── types/                # Strict TypeScript Definitions
└── public/               # High-Resolution Brand Assets
```

## 🛠️ Administrative Features (Studio)
The `/studio` command center provides advanced management for:
*   **Inquiries & Consultations**: Real-time management of client requests.
*   **Luxury Portfolio**: Rich text editing, architectural narratives, and service tagging.
*   **Services Module**: Detailed feature sets and execution process management.
*   **Testimonials**: Verified client narratives with project association.
*   **Search & Pagination**: Fluid data navigation for large-scale operations.

## ⚙️ Environment Configuration
Create a `.env.local` based on your requirements:
```env
ADMIN_PANEL_URL="/studio"
DEVELOPER_EMAIL="ahtesham2000@gmail.com"
ADMIN_EMAIL="admin@pashainterior.com"
DATABASE_PATH="contacts.db"
```

## 🚦 Getting Started
1. **Initialize Dependencies**:
    ```bash
    npm install
    ```
2. **Execute Development Engine**:
    ```bash
    npm run dev
    ```
3. **Launch Production Construction**:
    ```bash
    npm run build
    ```

---
**Design & Developed by Broadway Web Services**
