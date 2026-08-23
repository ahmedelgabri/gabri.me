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
pnpm format
```

### Git Commands

Use `command git` instead of `git` directly to avoid shell function conflicts
(e.g., `command git status`, `command git log`).

## Architecture

### Content Management

Content is managed through **Astro's MDX integration** with custom processing:

- Content organized in folder structure:
  `src/_content/{collection}/{slug}/post.mdx`
- Processed using @astrojs/mdx with Astro's Sätteri Markdown/MDX pipeline
- Metadata carried as YAML frontmatter in each MDX file, validated by the Zod
  schema in `src/content.config.ts`
- Content helper functions in `src/lib/content.ts` for querying posts
- Supports two content collections:
  - **Posts**: `src/_content/blog/{slug}/post.mdx`
  - **Weekly Links**: `src/_content/weekly-links/{slug}/post.mdx`

Each MDX file exports metadata including: title, date, tags, excerpt, and
published status.

### Content Processing Pipeline

MDX processing uses Astro's default Sätteri processor. `markdown.config.ts`
configures Shiki dual-theme syntax highlighting and a custom Shiki transformer
that renders code fence `filename=`/`title=` metadata as code block title bars.
Heading IDs are provided by the Sätteri/Astro pipeline.

### Astro Structure

Using Astro with TypeScript, plus React for the few `.tsx` components rendered
inside MDX:

- **Pages** (src/pages/):
  - `/` - Homepage (index.astro)
  - `/blog/[slug]` - Dynamic blog post pages
  - `/404` - Custom 404 page
  - `/feed.xml` - RSS feed generation
  - `/sitemap.xml` - Sitemap generation
  - `/og/[slug].png` - Per-post OpenGraph card generation (satori + resvg)
  - `/card` - Terminal card endpoint
  - `/llms.txt` - LLM manifest endpoint
  - `/robots.txt` - Robots file

- **Layout**: `src/layouts/Layout.astro` is the site's only layout. It carries
  the whole `<head>` (metadata, fonts, pre-paint theme script, GA4) and the page
  frame, and imports the design's base stylesheet. See `DESIGNS.md`.

- **Components** (src/components/):
  - The layout's partials — geometry ornaments (`Star`, `StarDivider`,
    `GirihFrieze`, `Arch`), the three.js layers (`NightSky`, `Pencil`,
    `Observatory`, `Astrolabe`) and `ProseLink`, which marks external links in
    rendered MDX so the design can flag them
  - `YouTube` - React component passed to MDX as a component override

  Tweets are embedded by importing `astro-tweet` directly in the MDX file.

- **Configuration** (src/config/):
  - `siteMeta.ts` - Site metadata, social links, author info

### Styling

The design owns its own CSS, written unprefixed against `.zj-*` and element
selectors and themed through custom properties on `:root`. The base stylesheet
is `src/styles/global.css`, imported by `src/layouts/Layout.astro`; rules that
belong to a single component stay in that component's own `<style is:global>`
block. Nothing is inside a cascade layer, which is what lets it outrank the
UnoCSS preflight.

**UnoCSS** (atomic CSS framework) is still in the build:

- Configuration: `uno.config.ts`
- Provides the preflight reset the design's CSS is written against
- Dark mode via class strategy (`dark:` prefix); post bodies use `dark:hidden` /
  `light:hidden` for paired light/dark images

### TypeScript Configuration

- Extends Astro's strict tsconfig
- Path aliases:
  - `@/*` → project root
- Strict mode enabled
- Module resolution: bundler

### Theme System

One axis only: light / dark / system.

- Inline pre-paint script in the layout's `<head>` (prevents a flash of the
  wrong ground)
- Reads the `theme` key from localStorage, defaulting to `system`, and resolves
  it against `prefers-color-scheme`
- Applies `light` or `dark` to the `<html>` element and dispatches `zj:theme` so
  the three.js layers can follow
- `window.__zjSetTheme` is the setter; the observatory control in the page
  corner is the only UI that calls it, wrapping it in a view transition

### Metadata & SEO

Comprehensive metadata configured in the layout's `<head>`:

- OpenGraph tags
- Twitter Card metadata
- Apple Web App configuration
- Fediverse creator verification
- Dynamic metadata per blog post

## Static Site Generation

All blog posts are statically generated at build time:

- `getStaticPaths()` creates paths for all posts
- Content sourced from MDX files via `src/lib/content.ts` helper functions
- Output is prerendered static HTML; the single exception is `/card`
  (`prerender = false`), which runs in the Cloudflare Worker — hence the adapter

## Important Files

- `astro.config.ts` - Astro configuration with MDX, UnoCSS, and React
  integrations
- `markdown.config.ts` - Shared Markdown/Shiki configuration
- `wrangler.jsonc` - Cloudflare Worker configuration
- `src/layouts/Layout.astro` - The site's layout and head
- `src/styles/global.css` - The design's base stylesheet
- `DESIGNS.md` - The design's own documentation
- `src/lib/content.ts` - Content querying helper functions
- `vitest.config.ts` - Vitest test configuration
- `uno.config.ts` - Styling configuration
- `flake.nix` - Development environment (flake-parts based)
- `src/config/siteMeta.ts` - Site-wide metadata
- `globals.d.ts` - Global TypeScript declarations

## Content Creation

To add new blog posts:

1. Create folder in `src/_content/blog/{slug}/`
2. Create `post.mdx` inside the folder
3. Add YAML frontmatter: `title`, `date`, optional `published` (default true),
   `tags` (default []), `excerpt` (falls back to a generated one)
4. Write content in MDX format (supports JSX/React components)

## Deployment

Deployed to **Cloudflare Workers** via `@astrojs/cloudflare`. `wrangler.jsonc`
holds the Worker configuration; `pnpm build` writes the prerendered site to
`dist/client`, the Worker to `dist/server`, and a resolved `wrangler.json`
beside it that `wrangler` picks up through `.wrangler/deploy/config.json`.

- `assets.html_handling` is `drop-trailing-slash`, the Workers equivalent of
  Astro's `trailingSlash: 'never'`
- `prerenderEnvironment: 'node'` is required: `/og/[...slug].png` renders
  through `@resvg/resvg-js`, a native Node addon that cannot run in workerd
- `wrangler.jsonc` deliberately has no `routes`/`custom_domain` yet — the zone
  is not in Cloudflare until DNS moves

Commands:

```bash
pnpm build            # produces dist/client + dist/server
pnpm exec wrangler deploy                 # production
pnpm exec wrangler versions upload        # a preview version, not live traffic
pnpm exec wrangler deploy --dry-run       # offline config check, no auth needed
```

CI (`.github/workflows/ci.yml`) runs tests, lint, format check, type check and
build, then deploys `main` with `wrangler deploy` and uploads a preview version
per pull request with
`wrangler versions upload --preview-alias pr-<number>-<branch>`, posting the
preview URL as a single sticky PR comment. Forks are excluded, since they have
no access to the credentials.

Repository configuration:

- Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Variable: `GA4_TRACKING_ID` (a repo _variable_, not a secret — the measurement
  ID ships in the page source). It is only passed to the production build, so
  previews emit no analytics markup at all.

Key redirects configured in astro.config.ts:

- `/feed` → `/feed.xml`
- `/work` → `/`
- `/blog` → `/`

The adapter compiles them into `dist/client/_redirects` as 301s, which Workers
static assets serves. `astro.config.ts` is the only place they are declared.

## Code Style

- Formatting via `oxfmt` (Rust-based formatter)
- Linting via `oxlint` with type-aware rules and tsgolint plugin
- TypeScript strict mode enforced
- Format code before committing
