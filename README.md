# gabri.me

Personal website and blog built with Next.js 16, featuring blog posts and weekly
links collections.

🔗 **Live site**: [https://gabri.me](https://gabri.me)

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Styling**: UnoCSS (atomic CSS)
- **Content**: MDX with Next.js native MDX support
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest with React Testing Library
- **Environment**: Dev Containers with mise
- **Deployment**: Netlify

## Features

- Static site generation for optimal performance
- Dark/light theme switching
- RSS feed (`/feed.xml`)
- Social card generation (`/card`)
- Syntax highlighting with Shiki
- SEO optimized with OpenGraph and Twitter Card metadata

## Development

### Using Dev Containers (Recommended)

**VS Code / Cursor**: Install the
[Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers),
open the project, and click "Reopen in Container" when prompted.

**GitHub Codespaces**: Click "Code" > "Codespaces" > "Create codespace on main".

**CLI**: With the devcontainer CLI installed:

```bash
devcontainer up --workspace-folder .
devcontainer exec --workspace-folder . pnpm dev
```

### Local Development (without containers)

Install [mise](https://mise.jdx.dev/) and run:

```bash
mise trust && mise install
pnpm install
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

# Run tests
pnpm test

# Run tests (CI)
pnpm test:run
```

**Note**: This project uses `pnpm`, not `npm` or `yarn`.

## Project Structure

```
src/
├── _content/           # MDX content
│   ├── blog/          # Blog posts (.mdx)
│   └── weekly-links/  # Weekly links collections (.mdx)
├── app/               # Next.js app routes
├── components/        # React components
├── config/            # Site configuration
├── hooks/             # Custom React hooks
└── lib/               # Utility functions (content querying, etc.)
```

## Content Management

Blog posts are written in MDX and stored in `src/_content/blog/`. Each post
requires an exported metadata object:

```mdx
export const metadata = {
	title: 'Post Title',
	date: '2024-01-01',
	published: true,
	tags: ['tag1', 'tag2'],
	excerpt: 'A brief description of the post',
}

Post content here with full MDX support...

<YouTube id="dQw4w9WgXcQ" />
```

Content is processed using Next.js native MDX support with custom rehype plugins
for syntax highlighting, heading anchors, and more.

## License

MIT
