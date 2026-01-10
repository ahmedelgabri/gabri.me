# MDX Migration Summary

## Overview

Successfully migrated from Velite to Next.js native MDX support. The project now
uses `@next/mdx` to process markdown files directly, eliminating the need for a
separate content processing step.

## Changes Made

### 1. Dependencies

**Added:**

- `@next/mdx` - Next.js MDX integration
- `@mdx-js/loader` - MDX webpack loader
- `@mdx-js/react` - MDX React integration

**Removed:**

- `velite` - No longer needed

**Kept:**

- `rehype-slug` - Adds IDs to headings
- `rehype-code-titles` - Adds titles to code blocks
- `rehype-prism-plus` - Syntax highlighting
- `rehype-autolink-headings` - Adds anchor links to headings
- `gray-matter` - For parsing frontmatter
- `globby` - For finding markdown files

### 2. Configuration Files

**Created:**

- `mdx-components.tsx` - Root-level MDX component configuration
- `src/lib/content.ts` - Content utilities for reading markdown files

**Modified:**

- `next.config.mjs` - Configured MDX support with rehype plugins
- `tsconfig.json` - Removed Velite path alias
- `globals.d.ts` - Added type declarations for `.md` and `.mdx` files
- `package.json` - Removed `content` script

**Removed:**

- `velite.config.ts` - No longer needed
- `.velite/` directory - Generated content directory

### 3. Core Architecture Changes

**Content Processing:**

- **Before:** Velite pre-processed all markdown at build time into HTML and
  generated TypeScript types
- **After:** MDX processes markdown at build time, importing content dynamically
  per route

**Metadata Extraction:**

- Created `src/lib/content.ts` with utilities to:
  - Read frontmatter from markdown files using `gray-matter`
  - Generate excerpts from content
  - Get git timestamps for `updated` field
  - Support both blog posts and weekly-links collections

**Rendering:**

- **Before:** Used `dangerouslySetInnerHTML` with pre-processed HTML
- **After:** Dynamic import of MDX components:
  `import('../../../_content/blog/${slug}.md')`

### 4. Updated Routes

**Modified files:**

- `src/app/blog/[slug]/page.tsx` - Dynamic MDX imports
- `src/app/page.tsx` - Uses `getAllPosts()` utility
- `src/app/sitemap.ts` - Uses `getAllPosts()` utility
- `src/app/feed.xml/route.ts` - Uses `getAllPosts()` utility

### 5. Rehype Plugin Configuration

Plugins are configured inline in `next.config.mjs` as string references to
ensure webpack serializability:

```javascript
const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		rehypePlugins: [
			'rehype-slug',
			'rehype-code-titles',
			['rehype-prism-plus', {defaultLanguage: 'txt'}],
			['rehype-autolink-headings', {properties: {className: ['anchor']}}],
		],
	},
})
```

### 6. MDX Components

The `mdx-components.tsx` file provides custom component mappings:

- `YouTube` - Custom YouTube embed component
- `a` - Custom link component with Next.js Link integration for internal links

## Features Preserved

All Velite features were replicated:

✅ Git timestamps via `git log` ✅ Automatic excerpt generation ✅ Frontmatter
parsing (title, date, published, tags) ✅ Formatted dates ✅ URL generation ✅
Support for both blog posts and weekly-links ✅ Raw markdown content for RSS
feed

## Build Performance

- Type checking: ✅ Passes
- Build: ✅ Successful
- Static generation: ✅ All 12 blog posts generated
- No runtime errors

## Content Format

Content files remain as `.md` (Markdown) files but are processed as MDX,
allowing:

- Standard Markdown syntax
- Optional JSX components (e.g., `<YouTube />`)
- Frontmatter metadata
- Code syntax highlighting with Prism

## Next Steps

1. Content files can now include JSX components directly
2. Consider migrating to `.mdx` extension for files that use JSX components
3. Weekly-links collection is ready to use the same pattern as blog posts
4. Custom MDX components can be added to `mdx-components.tsx` as needed

## Migration Benefits

- **Simpler architecture:** No separate content build step
- **Better DX:** Direct file imports, better IDE support
- **More flexible:** Can use React components in markdown
- **Standard approach:** Uses Next.js recommended MDX setup
- **Maintained features:** All Velite functionality preserved
