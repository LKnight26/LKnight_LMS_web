# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

Required in `.env`:
```bash
NEXT_PUBLIC_API_URL='http://localhost:5000/api'  # Backend API URL
# Production: 'https://lknightlmsbackend-production.up.railway.app/api'
```

## Git Remotes

This repo has two remotes - push to both when deploying:
- `origin` - Developer repo (MianHaziq/LKnight-Lms)
- `client` - Client repo (LKnight26/LKnight_LMS_web) - Connected to Vercel

## Tech Stack

- Next.js 16 with App Router and TypeScript
- React 19
- Tailwind CSS v4 (using `@import "tailwindcss"` syntax)
- Framer Motion for animations
- Recharts for data visualization (admin panel)

## Architecture

### Route Structure

- **Public pages**: `/`, `/about`, `/contact`, `/pricing`, `/courses`, `/vault`, `/privacy`, `/terms`
- **Coming Soon pages**: `/blog`, `/careers`, `/categories`, `/community`, `/help`, `/instructors`
- **Auth pages**: `/signin`, `/signup`, `/profile`
- **User dashboard**: `/dashboard/*` - Protected, requires authentication
  - Course viewing, checkout, enrolled courses
- **Admin panel**: `/admin/*` - Protected, requires ADMIN role
  - Dashboard, courses, users, categories, analytics, settings

### Component Organization

- `src/components/` - Public site components (Navbar, Footer, sections)
- `src/components/admin/` - Admin UI components with barrel export (`index.ts`)
- `src/components/vault/` - Vault/community feature components
- `src/components/ui/` - Shared UI components (Toast)

### Layout System

- Root layout (`src/app/layout.tsx`) - Applies fonts, NavigationProgress, and `Providers` (AuthContext)
- Admin layout (`src/app/admin/layout.tsx`) - Sidebar navigation, header, admin-only guard, completely separate from public site
- Dashboard layout (`src/app/dashboard/layout.tsx`) - Auth-protected user dashboard with Navbar/Footer
- `template.tsx` - Used for page transition animations

### Authentication System

`src/context/AuthContext.tsx` provides:
- `AuthProvider` - Wraps app via `src/components/Providers.tsx`
- `useAuth()` hook - Returns `{ user, token, isAuthenticated, isAdmin, login, signup, logout, updateUser, isLoading }`
- `withAuth()` HOC - For protecting components (optional `requireAdmin` option)
- Auth state stored in localStorage (`token`, `user`)

### API Layer

`src/lib/api.ts` contains typed API client connecting to backend at `NEXT_PUBLIC_API_URL` (default: `http://localhost:5000/api`):
- `api.get/post/put/patch/delete` - Base methods with auto auth header
- `authApi` - Login, signup, profile management
- `courseApi`, `categoryApi`, `moduleApi`, `lessonApi` - Course content CRUD
- `userApi` - User management (admin)
- `dashboardApi` - Admin dashboard stats/charts
- `enrollmentApi` - User course enrollment and progress

### Navigation

Custom navigation progress bar system:
- `NavigationProgress` component listens for custom window events
- `TransitionLink` component dispatches `navigation-start` and `navigation-complete` events
- Use `TransitionLink` instead of Next.js `Link` for animated navigation on public pages

### Styling Conventions

CSS variables defined in `globals.css`:
- `--primary: #000E51` (dark blue)
- `--secondary: #FF6F00` (orange)
- Fonts: Outfit (headings), Inter (body text)

Use utility classes: `.text-primary`, `.bg-primary`, `.text-secondary`, `.bg-secondary`, `.font-heading`, `.font-body`

### Path Alias

`@/*` maps to `./src/*` (e.g., `import Navbar from "@/components/Navbar"`)

### SEO System

`src/lib/seo.ts` provides centralized SEO configuration:
- `siteConfig` - Site name, URL, description, keywords
- `defaultMetadata` - Base metadata exported from root layout
- `createMetadata()` - Helper for page-specific metadata
- JSON-LD schema generators: `organizationSchema`, `websiteSchema`, `educationalOrganizationSchema`, `createCourseSchema()`, `createFAQSchema()`, `createBreadcrumbSchema()`
- `src/components/JsonLd.tsx` - Component to render JSON-LD in head

For client component pages, create a `layout.tsx` to export metadata (client components can't export metadata directly).

### Coming Soon Pages

Use `src/components/ComingSoon.tsx` for placeholder pages:
```tsx
import ComingSoon from "@/components/ComingSoon";

export default function PageName() {
  return (
    <ComingSoon
      title="Page Title"
      description="Description text"
      icon="rocket" // options: rocket, users, briefcase, edit, help, grid, community
    />
  );
}
```
