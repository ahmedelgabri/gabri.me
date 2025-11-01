# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a personal website and blog built with **Astro 4**, featuring blog posts
and weekly links collections. Content is managed through Astro's native Content
Collections with Markdown/MDX support.

## Development Environment

This project uses Nix for environment management via `flake.nix`. Enter the
development shell with:

```bash
nix develop
```

The development environment includes:

- Node.js
- pnpm (package manager)
- actionlint (GitHub Actions linter)

## Package Management

**CRITICAL**: This project uses `pnpm`, NOT `npm` or `yarn`. Always use `pnpm`
for all package management operations.

## Common Commands

### Development

```bash
# Start development server
pnpm dev

# Build for production (includes type checking)
pnpm build

# Preview production build locally
pnpm preview
```

### Code Quality

```bash
# Run linter (oxlint)
pnpm lint

# Type check (runs as part of build)
pnpm type-check
```

### Git Commands

Use `command git` instead of `git` directly to avoid shell function conflicts
(e.g., `command git status`, `command git log`).

## Architecture

### Content Management

Content is managed through **Astro Content Collections**
(src/content/config.ts):

- Markdown files stored in `src/content/` directory
- Type-safe frontmatter validation with Zod schemas
- Two content collections:
  - **Posts**: `src/content/posts/**/*.md`
  - **Weekly Links**: `src/content/weeklyLinks/**/*.md`
- Access content via `getCollection()` from `astro:content`

Each content item includes: title, date, published (boolean), tags (array), and
optional excerpt.

### Content Processing Pipeline

Markdown processing uses rehype plugins (configured in astro.config.mjs):

1. `rehype-slug` - adds IDs to headings
2. `rehype-code-titles` - adds titles to code blocks
3. `rehype-prism-plus` - syntax highlighting with Prism
4. `rehype-autolink-headings` - adds anchor links to headings

### Astro Project Structure

Using Astro 4 with TypeScript:

- **Pages** (src/pages/):
  - `index.astro` - Homepage
  - `blog/[slug].astro` - Dynamic blog post pages
  - `feed.xml.ts` - RSS feed generation (endpoint)
  - `robots.txt.ts` - Robots.txt generation (endpoint)

- **Layouts** (src/layouts/):
  - `BaseLayout.astro` - Root layout with HTML structure, fonts, and theme
    script

- **Components** (src/components/):
  - Astro components (Header, Footer, Logo, etc.)
  - All components use `.astro` extension
  - Theme switcher for dark/light mode

- **Configuration** (src/config/):
  - `siteMeta.ts` - Site metadata, social links, author info

### Styling

Uses **Tailwind CSS**:

- Configuration: `tailwind.config.mjs`
- Custom font stacks for serif (Playfair Display), sans (Inter), and monospace
- Dark mode via class strategy (`dark:` prefix)
- Custom utilities like `w-my` (65ch width)
- `@tailwindcss/typography` for prose styling
- Base styles in `src/styles/global.css` and `src/styles/prism.css`

Google Fonts loaded in BaseLayout.astro:

- Inter (sans-serif, variable font)
- Playfair Display (serif, variable font)

### TypeScript Configuration

- Path aliases:
  - `@/*` → project root
- Extends `astro/tsconfigs/strict`
- Strict mode enabled

### Theme System

Client-side theme switching implemented via:

- Inline script in BaseLayout.astro `<head>` (prevents FOUC)
- Reads from localStorage and respects `prefers-color-scheme`
- Vanilla JavaScript in ThemeSwitcher.astro component
- Theme classes applied to `<html>` element

### Metadata & SEO

Comprehensive metadata configured in BaseLayout.astro:

- OpenGraph tags
- Twitter Card metadata
- Apple Web App configuration
- Fediverse creator verification
- Dynamic metadata per blog post (passed as props to BaseLayout)

## Static Site Generation

All pages are statically generated at build time:

- `getStaticPaths()` creates paths for all blog posts
- Content queried via `getCollection()` from Astro
- Output: fully static HTML in `dist/` directory

## Important Files

- `astro.config.mjs` - Astro configuration with integrations (Tailwind, MDX,
  Sitemap)
- `tailwind.config.mjs` - Tailwind CSS configuration
- `src/content/config.ts` - Content collections schema
- `flake.nix` - Development environment (flake-parts based)
- `src/config/siteMeta.ts` - Site-wide metadata
- `netlify.toml` - Netlify deployment configuration

## Content Creation

To add new blog posts:

1. Create `.md` file in `src/content/posts/`
2. Include frontmatter: title, date, published (boolean), tags (array), excerpt
   (optional)
3. Content is automatically validated and typed via Zod schema
4. Access via `getCollection('posts')` in pages

## Deployment

Deployed to **Netlify** as an Astro static site.

Configuration in `netlify.toml`:

- Build command: `pnpm build`
- Publish directory: `dist`
- Redirects:
  - `/feed` → `/feed.xml`
  - `/work` → `/`
  - `/blog` → `/`
- Headers: `Permissions-Policy: interest-cohort=()`

## Code Style

- Prettier configuration from `@ahmedelgabri/prettier-config`
- Prettier plugin for Astro syntax
- Format code before committing
- TypeScript strict mode enforced

## Migration Notes

This project was migrated from Next.js 16 + UnoCSS to Astro 4 + Tailwind CSS.
See `MIGRATION.md` for detailed migration documentation.
