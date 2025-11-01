# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a personal website and blog built with Next.js 15 (App Router),
featuring blog posts and weekly links collections. Content is managed through
Markdown files and processed by Velite.

## Development Environment

This project uses Nix for environment management via `flake.nix`. Enter the
development shell with:

```bash
nix develop
```

The development environment includes:

- Node.js
- pnpm (package manager)
- Vercel CLI
- actionlint

## Package Management

**CRITICAL**: This project uses `pnpm`, NOT `npm` or `yarn`. Always use `pnpm`
for all package management operations.

## Common Commands

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Generate content from markdown files (runs automatically during dev/build)
pnpm content
```

### Code Quality

```bash
# Run linter (oxlint)
pnpm lint

# Type check
pnpm type-check
```

### Git Commands

Use `command git` instead of `git` directly to avoid shell function conflicts
(e.g., `command git status`, `command git log`).

## Architecture

### Content Management

Content is managed through **Velite** (velite.config.ts), which:

- Processes Markdown files from `src/_content/` directory
- Generates TypeScript types and data at `.velite/` (imported via
  `#site/content`)
- Automatically runs during `dev` and `build` via next.config.mjs
- Uses git timestamps for `updated` field via `git log -1 --format=%cd`
- Supports two content collections:
  - **Posts**: `src/_content/blog/**/*.md`
  - **Weekly Links**: `src/_content/weekly-links/**/*.md`

Each content item includes: title, date, tags, excerpt, and full Markdown body.

### Content Processing Pipeline

Markdown processing uses rehype plugins (configured in velite.config.ts):

1. `rehype-slug` - adds IDs to headings
2. `rehype-code-titles` - adds titles to code blocks
3. `rehype-prism-plus` - syntax highlighting with Prism
4. `rehype-autolink-headings` - adds anchor links to headings

### Next.js App Structure

Using Next.js 15 App Router with TypeScript:

- **App Routes** (src/app/):

  - `/` - Homepage (page.tsx)
  - `/blog/[slug]` - Dynamic blog post pages
  - `/feed.xml` - RSS feed generation
  - `/card` - Social card generation
  - Custom 404 (not-found.tsx) and error pages (error.tsx)

- **Components** (src/components/):

  - Modular React components (Header, Footer, Layout, etc.)
  - MDX components for custom Markdown rendering (mdxComponents.tsx)
  - Theme switcher for dark/light mode

- **Configuration** (src/config/):
  - `siteMeta.ts` - Site metadata, social links, author info

### Styling

Uses **UnoCSS** (atomic CSS framework):

- Configuration: `uno.config.ts`
- PostCSS integration: `postcss.config.mjs`
- Custom font stacks for serif (Playfair Display), sans (Inter), and monospace
- Dark mode via class strategy (`dark:` prefix)
- Custom utilities like `w-my` (65ch width)
- Base styles in `src/style/style.css` and `src/style/prism-plain.css`

Google Fonts loaded in layout.tsx:

- Inter (sans-serif, variable font)
- Playfair Display (serif, variable font)

### TypeScript Configuration

- Path aliases:
  - `@/*` → project root
  - `#site/content` → `.velite/` (generated content)
- Strict mode enabled
- Module resolution: bundler

### Theme System

Client-side theme switching implemented via:

- Inline script in layout.tsx (prevents flash of unstyled content)
- Reads from localStorage and respects `prefers-color-scheme`
- Custom hook: `src/hooks/useTheme.tsx`
- Theme classes applied to `<html>` element

### Metadata & SEO

Comprehensive metadata configured in layout.tsx:

- OpenGraph tags
- Twitter Card metadata
- Apple Web App configuration
- Fediverse creator verification
- Dynamic metadata per blog post (generateMetadata in [slug]/page.tsx)

## Static Site Generation

All blog posts are statically generated at build time:

- `generateStaticParams()` creates paths for all posts
- `dynamicParams = false` disables dynamic route generation
- Content sourced from Velite-generated data

## Important Files

- `velite.config.ts` - Content processing configuration
- `next.config.mjs` - Next.js configuration with redirects and headers
- `uno.config.ts` - Styling configuration
- `flake.nix` - Development environment
- `src/config/siteMeta.ts` - Site-wide metadata
- `globals.d.ts` - Global TypeScript declarations

## Content Creation

To add new blog posts:

1. Create `.md` file in `src/_content/blog/`
2. Include frontmatter: title, date, published (boolean), tags (array)
3. Content processes automatically via Velite
4. Git commit date used for `updated` field

## Deployment

Likely deployed to Vercel (Vercel CLI available in Nix shell).

## Code Style

- Prettier configuration from `@ahmedelgabri/prettier-config`
- Format code before committing
- TypeScript strict mode enforced
