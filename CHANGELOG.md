# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-08

### Changed
- **Eleventy v2 → v3.1.2**: Major framework upgrade from Eleventy 2.x to 3.x.
- **Theme system replaced**: Deleted `themes.js` (4 hardcoded themes: default, glass, dark, warm). Replaced with 8 accent color palettes in `accentColors.js` + reader-facing dark mode toggle. Set `site.theme` to one of: `emerald`, `indigo`, `rose`, `amber`, `blue`, `violet`, `teal`, `orange`.
- **Dark mode**: Tailwind `dark:` class strategy with light/dark/auto toggle in footer, localStorage persistence, and anti-FOUC blocking script in `<head>`.
- **Accent color system**: 8 named palettes (emerald, indigo, rose, amber, blue, violet, teal, orange) injected as CSS custom properties (`--accent-50` through `--accent-950`), consumed via Tailwind `accent-*` utilities.
- **Permalink simplification**: Replaced custom `customSlug` frontmatter field and `eleventyComputed` permalink logic with Eleventy's native `permalink` frontmatter. Chapters now use `permalink: "/your-slug/"` directly.
- **Dependency overhaul**: Replaced unmaintained `npm-run-all` with `concurrently`; replaced unmaintained `epub-gen` with `epub-gen-memory`; updated Puppeteer to v24, Lucide to v0.563, Tailwind to v3.4.19, and other minor dep bumps.
- **Homepage redesign**: Hero section with larger typography, "Start Reading" primary CTA, labeled PDF/EPUB secondary buttons, 3-column chapter grid on large screens. Chapter cards are fully clickable links with "Chapter N" accent labels, clamped 2-line descriptions, reading time, and subtle hover lift.
- **Chapter page redesign**: "Chapter N" accent label with left accent border, reading time display, `prose-lg` for readability, prev/next navigation cards with directional chevron icons, proper `<nav>` and `<header>` semantics. When no previous chapter exists, next card aligns right without empty gap.
- **Navigation overhaul**: Sidebar overlay fades smoothly (opacity transition instead of instant toggle). Hamburger button toggles `aria-expanded`. Escape key closes sidebar. Sidebar closes on any link click. Sidebar width set to 256px with collapsible mode on desktop.
- **Mobile bottom nav**: Fixed bottom bar on chapter pages (mobile only) with previous/next chapter links (truncated titles with chevrons) and a center TOC button that opens the sidebar.
- **Scoped progress bar**: Reading progress calculated from `<main>` element bounds — reaches 100% when article content ends, not at page bottom. Bar height increased to 4px.
- **Base layout redesign**: Sticky header with hamburger, sidebar with numbered chapters and current-chapter highlighting, footer with copyright and "Built with PutOut" link. Skip-to-content link, preconnect hints for Google Fonts, `scroll-padding-top` for anchor links.
- **Font configuration**: Users now set fonts in `site.js` (`fonts.heading` and `fonts.body`) instead of editing `tailwind.config.js`. Both `fonts.js` and `tailwind.config.js` read from `site.js` as single source of truth.
- **Site config restructured**: `site.js` reorganized with section headers (BOOK DETAILS, APPEARANCE, FORMATS, SOCIAL LINKS) and better comments.
- **Visual polish**: All transitions standardized to `duration-200` (except sidebar slide at `duration-300`). Homepage social icons sized consistently. Lucide icon default size changed from fixed `24px` to `1em` (inherits parent font-size). Explicit Tailwind size classes still override.
- **Build scripts**: `build` command is now explicit sequential steps; `build:tailwind` adds `--minify` flag.
- **Node.js**: Minimum version raised from 14 to 18.
- **Lucide CDN**: Pinned to specific version (0.563.0) instead of `@latest`.

### Added
- `src/_data/accentColors.js` — 8 named accent color palettes (emerald, indigo, rose, amber, blue, violet, teal, orange)
- `src/scripts/navigation.js` — sidebar, progress bar, prefetch, keyboard nav, swipe gestures, dark mode toggle, scroll-to-top
- `src/chapters/_chapter-template.md` — documented chapter starter template (excluded from build by underscore prefix)
- `src/404.njk` — custom 404 page with chapter directory
- `src/robots.njk` — SEO robots.txt
- `src/sitemap.njk` — XML sitemap
- `CLAUDE.md` — project documentation for AI tools
- Dark mode toggle (light/dark/auto) with localStorage persistence and anti-FOUC script
- Keyboard navigation (left/right arrow keys for prev/next chapter)
- Swipe gesture navigation on mobile (left/right swipe for prev/next chapter)
- Scroll-to-top button on chapter pages (appears at 30% scroll)
- Sidebar collapse on desktop (icon-only mode with toggle)
- JSON-LD structured data (Book schema on homepage, Article + BreadcrumbList on chapters)
- Print stylesheet (hides UI chrome, optimizes for printing, shows URLs after links)
- Noscript fallback warning banner
- `readingTime` Eleventy filter with reading time display on chapters and chapter cards
- `findChapterIndex` Eleventy filter for chapter numbering in templates
- Footer component in base layout with dark mode toggle and "Built with PutOut"
- Reading progress bar on chapter pages (scoped to article content)
- Mobile bottom navigation bar on chapter pages with prev/next links and TOC button
- Skip-to-content link (visible on keyboard focus, styled with accent color)
- `<link rel="preconnect">` hints for Google Fonts
- `scroll-behavior: smooth` and `scroll-padding-top: 4rem` in CSS
- Global `:focus-visible` styles using accent color with `outline-offset: 2px`
- Next chapter prefetch — at 50% scroll, injects `<link rel="prefetch">` for the next chapter URL

### Removed
- `src/_data/themes.js` (4 hardcoded themes: default, glass, dark, warm)
- `customSlug` frontmatter field and `eleventyComputed` permalink block from `.eleventy.js`
- `npm-run-all` dev dependency
- `epub-gen` dependency (replaced by `epub-gen-memory`)
- Inline JavaScript from `base.njk` (moved to `navigation.js`)
- "Read Chapter" buttons in chapter cards (entire card is now clickable)

## [1.1.0] - 2025-08-24

### Changed
- Updated dependencies: `tailwindcss@3.4.17`, `@tailwindcss/typography@0.5.16`, `postcss@8.5.6`, `autoprefixer@10.4.21`, `lucide@0.541.0`.
- Refreshed `package-lock.json` and cleaned up transitive packages.

### Security
- Ran `npm audit fix`; remaining advisories are from `epub-gen` transitive deps without available fixes.

### Verification
- Eleventy build, Tailwind CSS compile, and PDF/EPUB generation validated successfully.

## [1.0.0] - 2024-07-14

### Added
- Initial release of PutOut, an 11ty-based ebook-to-website conversion template
- Chapter management system using Markdown files
- Customizable themes with easy configuration
- Responsive design for optimal viewing on various devices
- SEO optimization with customizable meta tags
- Social sharing capabilities
- Hamburger menu for easy chapter navigation
- Integration with Tailwind CSS for styling
- Dynamic font loading based on Tailwind configuration
- Easy deployment process, optimized for Netlify
- Comprehensive README with setup and customization instructions
- MIT License for open-source use and modification

### Features
- Effortless setup process with clear documentation
- Fast and lightweight static site generation using 11ty
- Flexible theming system allowing for easy customization
- Automatic generation of chapter-based navigation
- SEO-friendly structure and meta tags
- Social media integration for increased shareability
