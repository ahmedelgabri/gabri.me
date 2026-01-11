# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a personal website and blog built with Next.js 16 (App Router),
featuring blog posts and weekly links collections. Content is managed through
MDX files using Next.js native MDX support.

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
# Start development server (Next.js telemetry disabled)
pnpm dev

# Build for production (Next.js telemetry disabled)
pnpm build

# Start production server (Next.js telemetry disabled)
pnpm start
```

### Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests once (for CI)
pnpm test:run
```

### Code Quality

```bash
# Run linter (oxlint with type-aware rules)
pnpm lint

# Type check
pnpm type-check

# Format code (oxfmt)
npx format
```

### Git Commands

Use `command git` instead of `git` directly to avoid shell function conflicts
(e.g., `command git status`, `command git log`).

## Architecture

### Content Management

Content is managed through **Next.js native MDX support** with custom
processing:

- Content organized in folder structure:
  `src/_content/{collection}/{slug}/post.mdx`
- Processed using @next/mdx with rehype plugins
- Metadata extracted via export statement in each MDX file
- Content helper functions in `src/lib/content.ts` for querying posts
- Uses git timestamps for `updated` field via `git log -1 --format=%cd`
- Supports two content collections:
  - **Posts**: `src/_content/blog/{slug}/post.mdx`
  - **Weekly Links**: `src/_content/weekly-links/{slug}/post.mdx`

Each MDX file exports metadata including: title, date, tags, excerpt, and
published status.

### Content Processing Pipeline

MDX processing uses rehype plugins (configured in mdx.config.ts):

1. `rehype-slug` - adds IDs to headings
2. `rehype-code-titles` - adds titles to code blocks
3. `rehype-prism-plus` - syntax highlighting with Prism
4. `rehype-autolink-headings` - adds anchor links to headings

The configuration is shared between:

- Next.js (via next.config.ts using string references)
- Vitest (via vitest.config.ts using actual imports with @mdx-js/rollup)

### Next.js App Structure

Using Next.js 16 App Router with TypeScript and React 19:

- React Compiler enabled for automatic optimizations
- Experimental inline CSS enabled for performance

- **App Routes** (src/app/):
  - `/` - Homepage (page.tsx)
  - `/blog/[slug]` - Dynamic blog post pages
  - `/feed.xml` - RSS feed generation
  - `/card` - Social card generation
  - Custom 404 (not-found.tsx) and error pages (error.tsx)

- **Components** (src/components/):
  - Modular React components (Header, Footer, Layout, etc.)
  - Tweet component for embedding tweets via react-tweet
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
- Strict mode enabled
- Module resolution: bundler
- MDX type declarations in globals.d.ts for .md and .mdx files

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
- Content sourced from MDX files via `src/lib/content.ts` helper functions

## Important Files

- `mdx.config.ts` - Shared MDX/rehype plugin configuration for Next.js and
  Vitest
- `next.config.ts` - Next.js configuration with MDX, redirects, and headers
- `mdx-components.tsx` - MDX component customizations (links, YouTube, etc.)
- `src/lib/content.ts` - Content querying helper functions
- `vitest.config.ts` - Vitest test configuration with MDX support
- `uno.config.ts` - Styling configuration
- `flake.nix` - Development environment (flake-parts based)
- `src/config/siteMeta.ts` - Site-wide metadata
- `globals.d.ts` - Global TypeScript declarations including MDX types

## Content Creation

To add new blog posts:

1. Create folder in `src/_content/blog/{slug}/`
2. Create `post.mdx` inside the folder
3. Export metadata object:
   `export const metadata = { title, date, published, tags, excerpt }`
4. Write content in MDX format (supports JSX/React components)
5. Git commit date automatically used for `updated` field via
   `src/lib/content.ts`

## Deployment

Deployed to **Netlify** as a Next.js static site.

Key redirects configured in next.config.ts:

- `/feed` → `/feed.xml`
- `/work` → `/`
- `/blog` → `/`

## Code Style

- Formatting via `oxfmt` (Rust-based formatter)
- Linting via `oxlint` with type-aware rules and tsgolint plugin
- TypeScript strict mode enforced
- Format code before committing
