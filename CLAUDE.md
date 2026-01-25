# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a personal website and blog built with **Astro**, featuring blog posts
and weekly links collections. Content is managed through MDX files using Astro's
native MDX integration.

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

# Build for production
pnpm build

# Preview production build
pnpm preview
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

Content is managed through **Astro's MDX integration** with custom processing:

- Content organized in folder structure:
  `src/_content/{collection}/{slug}/post.mdx`
- Processed using @astrojs/mdx with rehype plugins
- Metadata extracted via export statement in each MDX file
- Content helper functions in `src/lib/content.ts` for querying posts
- Uses git timestamps for `updated` field via `git log -1 --format=%cd`
- Supports two content collections:
  - **Posts**: `src/_content/blog/{slug}/post.mdx`
  - **Weekly Links**: `src/_content/weekly-links/{slug}/post.mdx`

Each MDX file exports metadata including: title, date, tags, excerpt, and
published status.

### Content Processing Pipeline

MDX processing uses rehype plugins (configured in astro.config.ts):

1. `rehype-slug` - adds IDs to headings
2. `rehype-code-titles` - adds titles to code blocks
3. `@shikijs/rehype` - syntax highlighting with Shiki (dual theme support)
4. `rehype-autolink-headings` - adds anchor links to headings

### Astro Structure

Using Astro with TypeScript and React for interactive components:

- **Pages** (src/pages/):
  - `/` - Homepage (index.astro)
  - `/blog/[slug]` - Dynamic blog post pages
  - `/feed.xml` - RSS feed generation
  - `/sitemap.xml` - Sitemap generation
  - `/card` - Terminal card endpoint
  - `/llms.txt` - LLM manifest endpoint
  - `/robots.txt` - Robots file
  - `/404` - Custom 404 page

- **Layouts** (src/layouts/):
  - `BaseLayout.astro` - Main layout with theme script and metadata

- **Components** (src/components/):
  - Astro components for static content
  - React components (with client:load) for interactive elements
  - Tweet component for embedding tweets via react-tweet
  - Settings popover for theme/color/font switching

- **Configuration** (src/config/):
  - `siteMeta.ts` - Site metadata, social links, author info

### Styling

Uses **UnoCSS** (atomic CSS framework):

- Configuration: `uno.config.ts`
- PostCSS integration: `postcss.config.mjs`
- Custom font stacks for serif, sans, and monospace
- Dark mode via class strategy (`dark:` prefix)
- Custom utilities like `w-content` (70ch max-width)
- Base styles in `src/style/style.css`
- Icons via @iconify-json/tabler and @iconify-json/logos

### TypeScript Configuration

- Extends Astro's strict tsconfig
- Path aliases:
  - `@/*` → project root
- Strict mode enabled
- Module resolution: bundler

### Theme System

Client-side theme switching implemented via:

- Inline script in BaseLayout.astro (prevents flash of unstyled content)
- Reads from localStorage and respects `prefers-color-scheme`
- Custom hooks: `src/hooks/useTheme.tsx`
- Theme classes applied to `<html>` element
- Three customizable aspects: theme (light/dark/system), color
  (blue/amber/teal/purple), font (mono/serif/sans)

### Metadata & SEO

Comprehensive metadata configured in BaseLayout.astro:

- OpenGraph tags
- Twitter Card metadata
- Apple Web App configuration
- Fediverse creator verification
- Dynamic metadata per blog post

## Static Site Generation

All blog posts are statically generated at build time:

- `getStaticPaths()` creates paths for all posts
- Content sourced from MDX files via `src/lib/content.ts` helper functions
- Output is a fully static site (no server required)

## Important Files

- `astro.config.ts` - Astro configuration with MDX, UnoCSS, and React
  integrations
- `mdx.config.ts` - Shared MDX/rehype plugin configuration
- `src/lib/content.ts` - Content querying helper functions
- `vitest.config.ts` - Vitest test configuration with MDX support
- `uno.config.ts` - Styling configuration
- `flake.nix` - Development environment (flake-parts based)
- `src/config/siteMeta.ts` - Site-wide metadata
- `globals.d.ts` - Global TypeScript declarations

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

Deployed to **Netlify** as a static site.

Key redirects configured in astro.config.ts:

- `/feed` → `/feed.xml`
- `/work` → `/`
- `/blog` → `/`

## Code Style

- Formatting via `oxfmt` (Rust-based formatter)
- Linting via `oxlint` with type-aware rules and tsgolint plugin
- TypeScript strict mode enforced
- Format code before committing
