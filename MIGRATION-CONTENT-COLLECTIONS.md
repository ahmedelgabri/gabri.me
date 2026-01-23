# Migration to Astro Content Collections

This document summarizes the migration from a custom manifest-based content
system to Astro's native Content Collections API.

## Overview

The site previously used a build-time manifest generation approach where a
script (`scripts/generate-content-manifest.ts`) would:

1. Scan MDX files in `src/_content/`
2. Extract metadata from `export const metadata = {...}` statements
3. Generate `src/lib/content-manifest.json` with all post metadata
4. This manifest was then imported by `src/lib/content.ts` to serve content
   queries

This has been replaced with Astro's Content Collections, which provides:

- Native integration with Astro's build system
- Type-safe content querying via `getCollection()` and `getEntry()`
- Built-in schema validation with Zod
- No need for custom build scripts

## Changes Made

### New Files

- `src/content/config.ts` - Content collection schema definitions

### Modified Files

- `src/_content/**/*.mdx` - Converted from `export const metadata` to YAML
  frontmatter
- `src/lib/content.ts` - Rewritten to use `astro:content` API
- `src/pages/blog/[slug].astro` - Updated to use `render()` from Content
  Collections
- `src/lib/__tests__/content.test.ts` - Removed (content API requires Astro
  context)
- `package.json` - Removed `generate-manifest` script from build commands

### Removed Files

- `scripts/generate-content-manifest.ts` - No longer needed
- `scripts/convert-to-frontmatter.ts` - One-time migration script
- `src/lib/content-manifest.json` - No longer needed
- `scripts/__tests__/generate-content-manifest.test.ts` - Tests for removed
  script

## Content Format Change

### Before (export statement)

```javascript
export const metadata = {
  title: 'Post Title',
  date: '2024-01-01',
  published: true,
  tags: ['tag1', 'tag2'],
}

Content here...
```

### After (YAML frontmatter)

```yaml
---
title: Post Title
date: 2024-01-01
published: true
tags: [tag1, tag2]
---
Content here...
```

## API Changes

The `PostMetadata` interface was simplified:

- Removed: `updated` (git timestamp) - was not used in rendering
- Removed: `filePath` - was not used in rendering

## Schema

Both `blog` and `weeklyLinks` collections use the same schema:

```typescript
z.object({
	title: z.string(),
	date: z.coerce.date(),
	published: z.boolean().default(true),
	tags: z.array(z.string()).default([]),
	excerpt: z.string().optional(),
})
```

The `date` field uses `z.coerce.date()` to handle YAML's automatic date parsing.

## Benefits

1. **Simpler build process** - No custom manifest generation step
2. **Type safety** - Full TypeScript integration via generated types
3. **Schema validation** - Zod validates frontmatter at build time
4. **Standard approach** - Uses Astro's recommended content management pattern
5. **Better DX** - Content changes are detected automatically in dev mode
