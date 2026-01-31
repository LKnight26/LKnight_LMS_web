# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- Next.js 16 with App Router and TypeScript
- React 19
- Tailwind CSS v4 (using `@import "tailwindcss"` syntax)
- Framer Motion for animations
- Recharts for data visualization (admin panel)

## Architecture

### Route Structure

- **Public pages**: `/`, `/about`, `/contact`, `/pricing`, `/courses`, `/vault`
- **Admin panel**: `/admin/*` with dedicated layout (`src/app/admin/layout.tsx`)
  - Dashboard, courses, users, categories, analytics, settings

### Component Organization

- `src/components/` - Public site components (Navbar, Footer, sections)
- `src/components/admin/` - Admin UI components with barrel export (`index.ts`)
- `src/components/vault/` - Vault/community feature components

### Layout System

- Root layout (`src/app/layout.tsx`) - Applies fonts and NavigationProgress
- Admin layout (`src/app/admin/layout.tsx`) - Sidebar navigation, header, completely separate from public site
- `template.tsx` - Used for page transition animations

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
