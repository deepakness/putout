# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

PutOut is an ebook-to-website template built on Eleventy (11ty) v3 with Tailwind CSS v3 and Nunjucks templating. Users write ebook chapters as Markdown files and get a static website with navigation, theming, SEO meta tags, and downloadable PDF/EPUB formats.

## Build & Dev Commands

```bash
npm run start              # Dev server (Eleventy watch + Tailwind watch via concurrently)
npm run build              # Full production build (Eleventy + Tailwind + PDF/EPUB generation)
npm run build:eleventy     # Build only the 11ty site
npm run build:tailwind     # Build only the Tailwind CSS (with --minify)
npm run build:formats      # Generate PDF and EPUB files (requires Puppeteer/Chrome)
```

Output goes to `dist/`. There are no tests or linters configured.

## Architecture

### Data Flow

`src/_data/site.js` is the central configuration (title, author, theme, fonts, social links, format toggles). It's available as `site` in all templates. The `site.theme` setting selects the accent/brand color (e.g. `"indigo"`), which determines the color palette injected as CSS custom properties. Light/dark mode is controlled by readers via a toggle in the footer (light/dark/auto).

### Theme & Color System

`src/_data/accentColors.js` defines 8 named color palettes (emerald, indigo, rose, amber, blue, violet, teal, orange), each mapping shade numbers (50–950) to RGB triplets. The user selects one via `site.theme` in `site.js`. In `base.njk`, the selected palette's values are injected as CSS custom properties (`--accent-50` through `--accent-950`). Tailwind is configured in `tailwind.config.js` with `accent-*` color utilities that reference these CSS variables, so templates can use classes like `bg-accent-600`, `text-accent-400`, etc.

### Dark Mode

Dark mode uses Tailwind's `dark:` class strategy (`darkMode: 'class'` in `tailwind.config.js`). A blocking script in `<head>` reads the user's preference from `localStorage` (key: `darkMode`, values: `"light"`, `"dark"`, `"auto"`) and applies the `dark` class to `<html>` before paint, preventing FOUC. The toggle in the footer cycles through light → dark → auto and persists to `localStorage`. In "auto" mode, the system's `prefers-color-scheme` is followed. Component styling uses inline Tailwind classes with `dark:` variants directly in templates (no separate theme objects).

### Font Configuration

Users set font names in `site.js` under `site.fonts.heading` and `site.fonts.body`. Both `fonts.js` (Google Fonts URL) and `tailwind.config.js` (font-family stacks) read from `site.js` as the single source of truth.

### Layout Chain

All pages use `base.njk` as the root layout, which provides the HTML shell, SEO meta tags, accent CSS variable injection, dark mode anti-FOUC script, a skip-to-content link, a sticky header with hamburger sidebar nav (on non-homepage pages), a reading progress bar, a dark mode toggle in the footer, and a footer. Two page-level layouts extend it:
- `homepage.njk` — hero section with cover image, book info, download CTAs, social icons, and a chapter card grid
- `chapter.njk` — article layout with chapter label, prose content, prev/next card navigation, and a mobile bottom nav bar

### Chapter System

Chapters live in `src/chapters/` as numbered Markdown files (e.g., `01-chapter-one.md`). The `chapters.json` directory data file assigns all of them the `chapter.njk` layout. Eleventy collects them into a `chapters` collection sorted numerically by filename (configured in `.eleventy.js`). Each chapter's frontmatter has `title`, `description`, and `permalink` (standard Eleventy permalink, e.g. `/introduction/`). A `_chapter-template.md` file provides a documented starter (excluded from build via `.eleventy.js` ignores).

### Permalink Logic

Chapters use Eleventy's native `permalink` frontmatter field (e.g. `permalink: "/introduction/"`). No custom permalink logic is needed in `.eleventy.js`.

### Format Generation

`scripts/generate-formats.js` reads the Markdown chapter files directly (not the built HTML), strips frontmatter, converts to HTML via markdown-it, then:
- **PDF**: Puppeteer renders a styled HTML document and prints to `dist/book.pdf`
- **EPUB**: `epub-gen-memory` creates a Buffer which is written to `dist/book.epub`

Both are gated by `site.formats.pdf` and `site.formats.epub` booleans.

### Navigation & Interaction

`src/scripts/navigation.js` handles:
- **Sidebar**: Open/close with hamburger button or mobile TOC button, smooth overlay fade transition, `aria-expanded` toggling, Escape key to close, closes on any link click or outside click
- **Progress bar**: Scoped to `<main>` element bounds (reaches 100% when article content ends, not page bottom)
- **Prefetch**: When reader passes 50% scroll, injects `<link rel="prefetch">` for the next chapter URL (via `data-next-chapter` attribute)
- **Dark mode toggle**: Cycles through light/dark/auto, persists to localStorage, updates `<html>` class and toggle icon/label

### Mobile Bottom Nav

Chapter pages include a fixed bottom navigation bar (visible only on mobile via `md:hidden`) with previous/next chapter links (truncated titles with chevron icons) and a center TOC button that opens the sidebar.

## Key Conventions

- Chapters must be numbered-prefix Markdown files (`01-*.md`, `02-*.md`) for correct sort order
- Files starting with `_` in `src/chapters/` are excluded from the build
- Component styling uses inline Tailwind classes with `dark:` variants directly in templates
- 8 theme colors available: `emerald`, `indigo`, `rose`, `amber`, `blue`, `violet`, `teal`, `orange`
- `site.theme` selects the accent color; light/dark mode is reader-controlled via toggle
- Accent colors flow through CSS custom properties, not hardcoded Tailwind color names
- Dark mode uses `darkMode: 'class'` in Tailwind config with anti-FOUC script in `<head>`
- The Eleventy config uses CommonJS (`require`/`module.exports`), not ESM
- Tailwind CSS is built separately from Eleventy (not integrated as an Eleventy plugin)
- Client-side JS lives in `src/scripts/navigation.js` (sidebar, progress bar, prefetch, dark mode)
- Deployment target is Netlify (`netlify.toml` configured with `dist/` publish dir)
- Global focus-visible styles use accent color (defined in `tailwind.css` `@layer base`)
- Lucide icons default to `1em` size (inheriting parent font-size); explicit Tailwind size classes override
