# gabri.me

Personal website and blog built with Astro, featuring blog posts and weekly
links collections.

Live site: [https://gabri.me](https://gabri.me)

## Tech Stack

- **Framework**: Astro 5 with React 19 for interactive components
- **Styling**: UnoCSS (atomic CSS)
- **Content**: MDX via @astrojs/mdx
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest with React Testing Library
- **Environment**: Nix flakes
- **Deployment**: Netlify

## Features

- Static site generation for optimal performance
- Dark/light theme switching with color and font customization
- RSS feed (`/feed.xml`)
- Social card generation (`/card`)
- Syntax highlighting with Shiki (dual light/dark themes)
- SEO optimized with OpenGraph and Twitter Card metadata

## Development

### Prerequisites

This project uses Nix for environment management. Enter the development shell:

```bash
nix develop
```

### Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm type-check

# Lint
pnpm lint

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests (CI)
pnpm test:run
```

**Note**: This project uses `pnpm`, not `npm` or `yarn`.

## Project Structure

```
src/
├── _content/           # MDX content
│   ├── blog/          # Blog posts (slug/post.mdx)
│   └── weekly-links/  # Weekly links collections (slug/post.mdx)
├── components/        # Astro and React components
├── config/            # Site configuration
├── hooks/             # Custom React hooks
├── layouts/           # Astro layout components
├── lib/               # Utility functions (content querying, etc.)
├── pages/             # Astro page routes
└── style/             # Global styles
```

## Content Management

Blog posts are written in MDX and stored in `src/_content/blog/{slug}/post.mdx`.
Each post uses YAML frontmatter for metadata:

```mdx
---
title: Post Title
date: 2024-01-01
published: true
tags: [tag1, tag2]
---

Post content here with full MDX support...
```

Content is processed using @astrojs/mdx with custom rehype plugins for syntax
highlighting (Shiki), heading anchors, and code block titles.

## License

MIT
