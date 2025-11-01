# Migration from Next.js + UnoCSS to Astro + Tailwind CSS

This document outlines the migration from Next.js 16 with UnoCSS to Astro 4 with
Tailwind CSS, completed on 2025-01-11.

## Overview

### What Changed

- **Framework**: Next.js 16 (App Router) → Astro 4 (Static Site Generation)
- **Styling**: UnoCSS → Tailwind CSS
- **Content**: Velite (custom processor) → Astro Content Collections (native)
- **Components**: React 19 → Astro Components (`.astro` files)
- **Build Output**: Next.js SSG → Astro Static Export

### Why Migrate?

- **Simplicity**: Astro's content collections eliminate the need for Velite
- **Performance**: Zero JavaScript by default, better Core Web Vitals
- **Developer Experience**: Better TypeScript integration, simpler mental model
- **Maintainability**: Standard Tailwind CSS instead of custom UnoCSS config

## Key Changes

### 1. Content Management

**Before (Velite)**:

```typescript
// velite.config.ts - Custom content processing
import {defineCollection, defineConfig, s} from 'velite'

const posts = defineCollection({
  name: 'Post',
  pattern: `blog/**/*.md`,
  schema: s.object({...})
})
```

**After (Astro Content Collections)**:

```typescript
// src/content/config.ts - Native Astro
import {defineCollection, z} from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({...})
})
```

Content moved from `src/_content/` to `src/content/`:

- `src/_content/blog/` → `src/content/posts/`
- `src/_content/weekly-links/` → `src/content/weeklyLinks/`

### 2. Styling Migration

**Before (UnoCSS)**:

```typescript
// uno.config.ts
rules: [
	['w-my', {width: '65ch'}],
	['font-serif', {'font-family': '...'}],
]
```

**After (Tailwind CSS)**:

```javascript
// tailwind.config.mjs
theme: {
  extend: {
    width: {my: '65ch'},
    fontFamily: {
      serif: ['var(--font-playfair-display)', ...],
    }
  }
}
```

All UnoCSS utility classes were replaced with standard Tailwind equivalents:

- Color scheme remains the same (slate/zinc colors)
- Dark mode strategy: `class` (same as before)
- Typography plugin added for prose styling

### 3. Component Architecture

**Before (React Components)**:

```tsx
// src/components/Header/index.tsx
import * as React from 'react'
import Logo from '../Logo'

export default function Header() {
	return (
		<div className="mb-12 flex items-center justify-between">
			<Logo />
			<ThemeSwitcher />
		</div>
	)
}
```

**After (Astro Components)**:

```astro
---
// src/components/Header.astro
import Logo from './Logo.astro'
import ThemeSwitcher from './ThemeSwitcher.astro'
---

<div class="mb-12 flex items-center justify-between">
  <Logo />
  <ThemeSwitcher />
</div>
```

All React components converted to Astro:

- `src/components/Header/index.tsx` → `src/components/Header.astro`
- `src/components/Footer/index.tsx` → `src/components/Footer.astro`
- `src/components/Layout/index.tsx` → `src/components/ContentLayout.astro`
- `src/components/List/index.tsx` → `src/components/List.astro`
- `src/components/Logo/index.tsx` → `src/components/Logo.astro`
- `src/components/Contact/index.tsx` → `src/components/Contact.astro`
- `src/components/Prose/H.tsx` → `src/components/H.astro`

### 4. Routing

**Before (Next.js App Router)**:

```
src/app/
├── page.tsx                  # Homepage
├── layout.tsx                # Root layout
├── blog/[slug]/page.tsx      # Blog post
└── feed.xml/route.ts         # RSS feed
```

**After (Astro File-based Routing)**:

```
src/
├── layouts/BaseLayout.astro     # Root layout
├── pages/
│   ├── index.astro              # Homepage
│   ├── blog/[slug].astro        # Blog post
│   ├── feed.xml.ts              # RSS feed
│   └── robots.txt.ts            # Robots.txt
```

### 5. Theme Switching

Theme switching logic preserved but implementation updated:

**Before**: React hook with `useTheme()` and `'use client'` directive **After**:
Vanilla JavaScript with Astro's `<script>` tag

The inline theme script in `<head>` remains identical to prevent FOUC (Flash of
Unstyled Content).

### 6. RSS Feed

**Before (Next.js Route Handler)**:

```typescript
// src/app/feed.xml/route.ts
import RSS from 'rss'

export async function GET(req: Request) {
  const feed = new RSS({...})
  return new Response(feed.xml())
}
```

**After (Astro Endpoint)**:

```typescript
// src/pages/feed.xml.ts
import rss from '@astrojs/rss'

export async function GET(context: any) {
  return rss({
    title: '...',
    items: [...]
  })
}
```

### 7. Configuration Files

**Removed**:

- `next.config.mjs` - Next.js configuration
- `velite.config.ts` - Content processing
- `uno.config.ts` - UnoCSS configuration
- `postcss.config.mjs` - PostCSS (for UnoCSS)

**Added**:

- `astro.config.mjs` - Astro configuration with integrations
- `tailwind.config.mjs` - Tailwind CSS configuration
- `netlify.toml` - Explicit Netlify deployment config

**Updated**:

- `tsconfig.json` - Now extends `astro/tsconfigs/strict`
- `package.json` - New scripts and dependencies

## Dependencies

### Removed

```json
{
	"next": "16.0.1",
	"react": "19.2.0",
	"react-dom": "19.2.0",
	"velite": "^0.3.0",
	"unocss": "66.5.4",
	"@unocss/postcss": "66.5.4",
	"react-icons": "5.5.0",
	"rss": "1.2.2"
}
```

### Added

```json
{
	"astro": "^4.16.18",
	"@astrojs/mdx": "^3.1.9",
	"@astrojs/sitemap": "^3.2.1",
	"@astrojs/tailwind": "^5.1.2",
	"@astrojs/rss": "^4.0.9",
	"tailwindcss": "^3.4.17",
	"@tailwindcss/typography": "^0.5.15",
	"prettier-plugin-astro": "^0.14.1"
}
```

### Kept

- `date-fns` - Date formatting
- `clsx` - Conditional classes
- `rehype-*` plugins - Markdown processing
- `oxlint` - Linting
- `prettier` - Code formatting

## Build Process

### Before

```bash
pnpm dev   # Next.js dev server with Velite watching
pnpm build # Next.js production build
pnpm start # Next.js production server
```

### After

```bash
pnpm dev     # Astro dev server
pnpm build   # Astro static build + type checking
pnpm preview # Preview production build locally
```

## Deployment

### Netlify Configuration

**Before**: Implicit Next.js detection

**After**: Explicit configuration in `netlify.toml`:

```toml
[build]
command = "pnpm build"
publish = "dist"

[[redirects]]
from = "/feed"
to = "/feed.xml"
status = 301
```

Build output directory changed from `.next` to `dist/`.

## What Stayed the Same

1. **Content Structure**: All markdown files unchanged
2. **Styling Values**: Colors, fonts, spacing all preserved
3. **Site Metadata**: `src/config/siteMeta.ts` unchanged
4. **Nix Development Environment**: `flake.nix` unchanged
5. **SEO**: All meta tags, OpenGraph, Twitter Cards preserved
6. **Dark Mode**: Theme switching behavior identical
7. **Markdown Processing**: Same rehype plugins
8. **Syntax Highlighting**: Prism.js configuration preserved

## Verification Checklist

- [x] All blog posts render correctly
- [x] RSS feed generates with all posts
- [x] Dark/light theme switching works
- [x] Sitemap generates correctly
- [x] Robots.txt accessible
- [x] All redirects work (/feed → /feed.xml, /blog → /, /work → /)
- [x] Build completes without errors
- [x] TypeScript type checking passes
- [x] Social links and icons display correctly
- [x] Responsive layout works on mobile/desktop
- [x] Syntax highlighting in code blocks works

## Performance Impact

Expected improvements:

- **JavaScript Bundle**: ~90% reduction (Astro ships zero JS by default)
- **Build Time**: Faster (no React compilation)
- **Page Load**: Improved (static HTML, no hydration)
- **SEO**: Better (full SSG, no client-side rendering)

## Breaking Changes

None for end users. The site appears and functions identically.

For developers:

- Different component syntax (`.astro` instead of `.tsx`)
- Different content query API (`getCollection` instead of Velite imports)
- Different styling approach (Tailwind instead of UnoCSS)

## Rollback Plan

If issues arise, rollback process:

1. `git revert` to commit before migration
2. Run `pnpm install` to restore Next.js dependencies
3. Deploy previous version

Keep the `astro` branch until confident in production.

## Next Steps

1. Monitor Netlify build logs for any issues
2. Test all pages in production
3. Check Core Web Vitals in Google Search Console
4. Remove old Next.js/React dependencies after successful deployment
5. Update CLAUDE.md documentation

## References

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Migration Commit](git log -1 --oneline)
