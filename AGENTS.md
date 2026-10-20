This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
pnpm dev              # Start the Astro dev server
npx emdash types      # Regenerate TypeScript types from a running site
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, taxonomies, menus, widgets) |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, search, page contributions)                 |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Documentation

The EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp`. When you need to verify an API, hook, config option, field type, or pattern, call `search_docs` against the live documentation rather than relying on training-data recall. The docs reflect current behaviour; assumptions may not.

This template ships with `.mcp.json`, `.cursor/mcp.json`, and `.vscode/mcp.json` so Claude Code, Cursor, and VS Code auto-discover the docs server. Other tools (OpenCode, Windsurf, etc.) need a manual one-time setup -- see [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp).

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- When Astro's cache is enabled, pass content-query hints to `Astro.cache.set(cacheHint)`. Use the `WithCacheHint` variants for site settings, menus, taxonomies, and widget areas rendered by cached routes.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).

## This Template

This is the ツピツピ (tsupitsupi) theme: a Japanese blog theme built from the EmDash blog template and modeled on STORK19-style WordPress themes. **Read `CLAUDE.md` first** for theme-specific rules (Japanese-first UI, component folders, page builder blocks, menus and widget areas, free-plan only).

## Pages

| Page        | Path               | What it shows                                                                                       |
| ----------- | ------------------ | --------------------------------------------------------------------------------------------------- |
| Home        | `/`                | The `pages` entry with slug `home`, rendered through its blocks (falls back to latest posts)        |
| All posts   | `/posts`           | Post rows with category chips; cursor pagination; sidebar                                           |
| Post detail | `/posts/[slug]`    | Breadcrumbs, category, title, dates, image, TOC, body, tags, share, author, prev/next, related, comments. `layout` field picks 2カラム / 1カラム |
| Page        | `/pages/[slug]`    | Blocks + body. `page_layout` picks 2カラム / 1カラム / フルワイド. `/pages/home` redirects to `/`      |
| Category    | `/category/[slug]` | Post rows in a category                                                                             |
| Tag         | `/tag/[slug]`      | Post rows with a tag                                                                                |
| Search      | `/search`          | Full-text search over posts                                                                         |
| RSS         | `/rss.xml`         | Generated feed                                                                                      |

## Schema

- `posts`: `title`, `featured_image`, `content`, `excerpt`, `layout` (select).
- `pages`: `title`, `content`, `page_layout` (select), `top_blocks` / `main_blocks` / `bottom_blocks` (blocks).
- Block types: `hero`, `features`, `post_list`, `cta`, `rich_text`.
- Taxonomies: `category`, `tag` (the `popular` tag feeds the 人気の投稿 widget, `pickup` is for pick-up lists).
- Menus: `primary`, `mobile`, `cta`, `mobile-bar`, `footer`.
- Widget areas: `sidebar`, `main-top`, `main-bottom`, `home-after-posts`, `post-bottom`, `drawer`, `footer`.

## Visual character

Inspired by the great tit (シジュウカラ): a near-black ink (`--color-ink`) for the hero band, h2 headings and footer; white cards on a warm off-white canvas; a green brand colour (`--color-brand`) for buttons and links; a soft yellow (`--color-accent-soft`) for category chips. Noto Sans JP throughout, heavy weights (700/900) for headings. Cards have a 1px border and 12px radius (`--radius-card`).

## Customisation

Override tokens in `src/styles/theme.css` (unlayered, so it beats `@layer base` in `tokens.css` and `site.css`). Colours use `light-dark()`. Industry styles (corporate, clinic, …) should be token overrides plus purpose-specific components, not copies of page structure.

## What not to do

- Don't write UI copy in English; this theme targets Japanese bloggers.
- Don't add monetization blocks (speech bubbles, boxes, rankings, comparison tables, ad slots) here; they belong to the paid Pro extension.
- Don't enable `worker_loaders` or anything that requires the Workers Paid plan.
- Don't hard-code colours or sizes in components; use tokens.
- Comments are enabled on posts. Configure moderation before publishing, or remove `commentsEnabled` and the comments UI together.
