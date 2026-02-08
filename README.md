# PutOut - Ebook-to-Website with 11ty

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/github/package-json/v/deepakness/putout)](https://github.com/deepakness/putout)
[![Last Commit](https://img.shields.io/github/last-commit/deepakness/putout)](https://github.com/deepakness/putout/commits/main)

Turn your ebook into a beautiful, easy-to-navigate website using [Eleventy (11ty) v3](https://www.11ty.dev/) and [Tailwind CSS v3](https://tailwindcss.com/). This project provides a solid starting point with a pre-configured template, streamlined chapter management, 8 accent color palettes, and reader-controlled dark mode.

## Table of Contents

- [Quick Deploy](#quick-deploy-)
- [Features](#features-)
- [Demo](#demo-)
- [Getting Started](#getting-started-)
- [Deployment](#deployment-)
- [Updating the Template](#updating-the-template-)
- [Customization](#customization-)
- [Contributing](#contributing-)
- [Troubleshooting](#troubleshooting-)
- [License](#license-)

## Documentation 📖

Full documentation is available on the [PutOut Wiki](https://github.com/deepakness/putout/wiki) — covers configuration, chapters, theming, SEO, accessibility, PDF/EPUB generation, deployment, and more.

## Quick Deploy ⚡️

Quickly deploy your own copy of this project to Netlify with one click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/deepakness/putout)

This will create a new repository in your GitHub account with this project's files, connect it to Netlify, and deploy it. You can later make changes to the GitHub repository.

## Features ✨

- **Effortless Setup:** Get up and running quickly with a well-structured template and clear installation instructions.
- **Chapter Organization:** Manage your ebook's chapters easily in individual Markdown files.
- **Navigation:** Sidebar navigation with hamburger menu, keyboard shortcuts (arrow keys), swipe gestures on mobile, and a mobile bottom nav bar.
- **8 Accent Colors:** Choose from emerald, indigo, rose, amber, blue, violet, teal, or orange to brand your site. Set one value in `site.js`.
- **Dark Mode:** Reader-controlled light/dark/auto toggle with localStorage persistence and anti-FOUC script.
- **Reading Experience:** Progress bar, reading time estimates, scroll-to-top button, and next-chapter prefetch at 50% scroll.
- **Fast and Lightweight:** Eleventy v3 ensures a blazing-fast website experience for your readers.
- **SEO-Friendly:** Meta tags, JSON-LD structured data (Book + Article schemas), XML sitemap, and robots.txt.
- **Accessibility:** Skip-to-content link, focus-visible styles, keyboard navigation, noscript fallback, and print stylesheet.
- **Social Links:** Make it easy for readers to find you on social media.
- **PDF and EPUB Generation:** Automatically generate PDF and EPUB files for your ebook.
- **Custom 404 Page:** Styled error page with chapter directory for easy recovery.

## Demo 🚀

Check out the live demo of this ebook template: [Demo](https://ebook.untalkedseo.com/)

## Getting Started 🛠️

**Prerequisites:** Node.js 18 or later.


1. **Use This Template:**
   
Click the "Use this template" button at the top of this repository to create your own copy.

2. **Clone Your Repository:**

```bash
git clone https://github.com/<username>/<repository>.git
```

```bash
cd <repository>
```

3. **Install Dependencies:**

```bash
npm install
```

4. **Configure Your Ebook:**

- Open `src/_data/site.js` and customize the settings (title, author, description, social links, etc.) to match your ebook.
- Replace the sample chapters in `src/chapters` with your ebook's chapters (in Markdown format).

5. **Start Development Server:**

```bash
npm run start
```
This will start a local development server at `http://localhost:8080/`. Open this URL in your web browser.

6. **Build for Production:**

```bash
npm run build
```
This will generate your static website files in the `dist/` directory, ready for deployment.

## Deployment 🚀

The easiest way to deploy your ebook website is with [Netlify](https://www.netlify.com/):

1. Push your project to your GitHub repository.
2. Create a new site on Netlify and connect it to your GitHub repository.
3. Configure build settings (if needed): Set the build command to `npm run build` and the publish directory to `dist/`.
4. Deploy: Netlify will automatically build and deploy your site whenever you push changes to your repository.


## Updating the Template 🔄

To get the latest updates from the original template:

1. Add the original repository as a remote (you only need to do this once):

```bash
git remote add template https://github.com/deepakness/putout.git
```

2. Fetch the latest changes:

```bash
git fetch template
```

3. Merge the changes into your main branch:

```bash
git merge template/main --allow-unrelated-histories
```

4. Resolve any conflicts and commit the changes:

```bash
git add .
```

```bash
git commit -m "Merged updates from template"
```

5. Push the changes to your repository:

```bash
git push origin main
```

## Customization 🎨

All key settings live in **`src/_data/site.js`**:

- **Accent Color:** Set `theme` to one of: `emerald`, `indigo`, `rose`, `amber`, `blue`, `violet`, `teal`, `orange`. This changes buttons, links, highlights, and all branded elements across the site. Colors are defined in `src/_data/accentColors.js`.
- **Dark Mode:** Readers control light/dark/auto mode via a toggle in the footer. No configuration needed — it works out of the box with localStorage persistence.
- **Fonts:** Set `fonts.heading` and `fonts.body` to any Google Fonts family name. No need to touch `tailwind.config.js`.
- **New Chapters:** Copy `src/chapters/_chapter-template.md`, rename with a number prefix (e.g., `04-my-chapter.md`), and fill in the frontmatter (`title`, `description`, `permalink`). The `permalink` field controls the URL (e.g., `permalink: "/my-chapter/"`).
- **Layouts:** Customize page layouts in `src/_includes/`.


## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting 🔧

- **Build Errors:** Ensure all dependencies are installed (`npm install`) and you're using a compatible Node.js version.
- **Styling Issues:** Check your `tailwind.config.js` and ensure you've rebuilt your CSS (`npm run build:tailwind`).
- **Content Not Updating:** Make sure your Markdown files are in the correct location and format.

For more help, please [open an issue](https://github.com/deepakness/putout/issues).

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
