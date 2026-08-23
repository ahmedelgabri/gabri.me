# gabri.me

Ahmed El Gabri's personal website and blog, built with Astro. The design is
called Zellij, and it is as much the point of the site as the writing is.

Live site: [https://gabri.me](https://gabri.me)

## The design

Zellij is grounded in Cairo's Islamic architectural history rather than in
generic ornament: a manuscript carpet page framed by an exact star-and-cross
girih system, a computed two-centred arch struck over every post title, and a
rosette lattice drifting in the margins. Light mode is a qishani ivory
manuscript page; dark mode is the Blue Quran — gold on indigo, not an inverted
light theme.

The full account — the six arches, the lattice construction, the three.js layers
and the observatory behind the theme switch — is in [DESIGNS.md](./DESIGNS.md).

## Tech Stack

- **Framework**: Astro 7, with React 19 for the components used inside MDX
- **Content**: MDX through Astro content collections
- **Styling**: the design carries its own CSS in one global block; UnoCSS
  supplies the preflight reset it is written against, plus the handful of
  utilities used in post bodies
- **Graphics**: computed SVG throughout, and three.js for the night sky, the
  lattice pencil and the footer astrolabe
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest with React Testing Library on happy-dom
- **Tooling**: oxlint (type-aware) and oxfmt
- **Environment**: Nix flakes
- **Deployment**: Netlify

## Development

### Prerequisites

This project uses Nix for environment management. Enter the development shell:

```bash
nix develop
```

That gives you Node, pnpm, actionlint and the Netlify CLI.

### Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests (CI)
pnpm test:run

# Lint
pnpm lint

# Format
pnpm format

# Type check
pnpm type-check
```

**Note**: This project uses `pnpm`, not `npm` or `yarn`.

## Project Structure

```
src/
├── _content/          # MDX content
│   ├── blog/          # Blog posts (slug/post.mdx)
│   └── weekly-links/  # Weekly links (slug/post.mdx), not currently rendered
├── assets/            # Images used by pages and cards
├── components/        # Components available to MDX bodies
├── config/            # Site metadata
├── designs/zellij/    # The design: layout, partials, geometry and WebGL
├── lib/               # Content querying, excerpts, sitemap and robots
├── pages/             # Routes and endpoints
└── content.config.ts  # Collection definitions and schemas
```

`src/designs/zellij/Layout.astro` is the site's only layout: it owns the whole
`<head>` (metadata, OpenGraph and Twitter cards, the pre-paint theme script),
the carpet-page frame, and all of the design's CSS.

## Routes

| Route          | Page                      |
| -------------- | ------------------------- |
| `/`            | Home                      |
| `/blog/[slug]` | Every published blog post |
| `/404`         | Page not found            |

Alongside them: `/feed.xml`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`,
`/og/[slug].png` (per-post social cards rendered with Satori) and `/card` (a
terminal business card, `curl gabri.me/card`).

## Content

Blog posts are MDX files at `src/_content/blog/{slug}/post.mdx`, loaded as an
Astro content collection. Each one carries YAML frontmatter validated against
the schema in `src/content.config.ts`:

```mdx
---
title: Post Title
date: 2024-01-01
published: true
tags: [tag1, tag2]
---

Post content here with full MDX support...
```

`published` defaults to `true` and `tags` to `[]`. `excerpt` is optional; when
it is absent, one is generated from the body.

Post bodies get `YouTube` and the design's prose link component supplied to
them, and can import anything else they need. Code fences are highlighted by
Shiki in dual light/dark themes, configured in `markdown.config.ts`, which also
turns a `filename=` or `title=` on the fence into a title bar above the block.

## Deployment

Deployed to Netlify. Pages are prerendered to static HTML at build time; the
`/card` endpoint is the one thing rendered on demand, through
`@astrojs/netlify`. The build also minifies the HTML and precompresses
everything to Brotli, gzip and Zstandard.

CI (`.github/workflows/ci.yml`) runs the tests, linter, formatter check, type
check and build, then deploys with the Netlify CLI.

## License

MIT
