# gabri.me

Personal website and blog built with Next.js 16, featuring blog posts and weekly
links collections.

🔗 **Live site**: [https://gabri.me](https://gabri.me)

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Styling**: UnoCSS (atomic CSS)
- **Content**: Markdown processed via Velite
- **Language**: TypeScript (strict mode)
- **Environment**: Nix flakes
- **Deployment**: Netlify

## Features

- Static site generation for optimal performance
- Dark/light theme switching
- RSS feed (`/feed.xml`)
- Social card generation (`/card`)
- Syntax highlighting with Prism
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

# Type check
pnpm type-check

# Lint
pnpm lint

# Generate content from markdown
pnpm content
```

**Note**: This project uses `pnpm`, not `npm` or `yarn`.

## Project Structure

```
src/
├── _content/           # Markdown content
│   ├── blog/          # Blog posts
│   └── weekly-links/  # Weekly links collections
├── app/               # Next.js app routes
├── components/        # React components
├── config/            # Site configuration
└── hooks/             # Custom React hooks
```

## Content Management

Blog posts are written in Markdown and stored in `src/_content/blog/`. Each post
requires frontmatter:

```markdown
---
title: 'Post Title'
date: '2024-01-01'
published: true
tags: ['tag1', 'tag2']
---

Post content here...
```

Content is automatically processed by Velite during `dev` and `build`,
generating TypeScript types and data.

## License

MIT
