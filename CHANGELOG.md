# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1] - 2025-08-24

### Changed
- Updated dependencies: `tailwindcss@3.4.17`, `@tailwindcss/typography@0.5.16`, `postcss@8.5.6`, `autoprefixer@10.4.21`, `lucide@0.541.0`.
- Refreshed `package-lock.json` and cleaned up transitive packages.

### Security
- Ran `npm audit fix`; remaining advisories are from `epub-gen` transitive deps without available fixes.

### Verification
- Eleventy build, Tailwind CSS compile, and PDF/EPUB generation validated successfully.

## [1.0] - 2024-07-14

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
