# AGENTS.md

## Build & Runtime

- **Bun** — package manager and runtime
- **Vite 8** — build tool and dev server
- **SvelteKit 2** — full-stack framework (Svelte 5, `@sveltejs/kit`)
- **Svelte 5** — UI framework (runes mode: `$props`, `$state`, `$derived`, `$effect`)
- **Tailwind CSS 4** — utility-first CSS (`@tailwindcss/vite` plugin, `@theme` directive)
- **TypeScript 6** — typed JavaScript
- **@sveltejs/adapter-static** — prerenders to static HTML/CSS/JS (GitHub Pages)

## Linting & Formatting

- **ESLint** — linting (`eslint.config.js`), with:
  - `@eslint/js` (recommended rules)
  - `typescript-eslint` (TS recommended)
  - `eslint-plugin-svelte` (Svelte recommended)
- **Prettier** — code formatting (tabs, single quotes, 100 char width)
  - `prettier-plugin-svelte`
  - `prettier-plugin-tailwindcss` (sorts Tailwind classes, reads `./src/app.css`)
- **svelte-check** — Svelte type-checking (`bun run check`)

## Key Dependencies

| Package                                | Purpose                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------- |
| `@iconify/json` + `@iconify/tailwind4` | Iconify icon set (usage: `icon-[collection--name]` in Tailwind)         |
| `mdsvex`                               | Markdown/MDX preprocessor for Svelte (blog posts as `.md`/`.svx` files) |

## Scripts (`bun run <script>`)

| Script    | Command                                                      |
| --------- | ------------------------------------------------------------ |
| `dev`     | `vite dev` — dev server                                      |
| `build`   | `vite build` — production build                              |
| `preview` | `vite preview` — preview production build                    |
| `check`   | `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json` |
| `format`  | `prettier --write .`                                         |
| `lint`    | `prettier --check . && eslint .`                             |

## Project Conventions

- **Static prerender**: `export const prerender = true` in root `+layout.js`
- **Path alias**: `$lib` → `./src/lib`, `src` → `./src` (configured in `svelte.config.js`)
- **Blog posts**: Markdown files at `src/routes/blogs/[slug]/+page.md`, processed by mdsvex
- **Blog layout**: `src/routes/blogs/blog_layout.svelte` wraps all blog posts
- **Design system**: Documented in `./DESIGN.md` (Stitch format — YAML tokens + Markdown rationale)

## Stack Summary

```
Bun → Vite → SvelteKit (Svelte 5 + TypeScript) + Tailwind CSS 4 + Iconify → static HTML
```
