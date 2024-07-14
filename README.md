# PutOut - Ebook-to-Website with 11ty

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/github/package-json/v/deepakness/putout)](https://github.com/deepakness/putout)
[![Last Commit](https://img.shields.io/github/last-commit/deepakness/putout)](https://github.com/deepakness/putout/commits/main)

Turn your ebook into a beautiful, easy-to-navigate website using the power of [11ty](https://www.11ty.dev/), a simpler static site generator. This project provides a solid starting point with a pre-configured template, streamlined chapter management, and customizable themes.

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

## Quick Deploy ⚡️

Quickly deploy your own copy of this project to Netlify with one click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/deepakness/putout)

This will create a new repository in your GitHub account with this project's files, connect it to Netlify, and deploy it. You can later make changes to the GitHub repository.

## Features ✨

- **Effortless Setup:**  Get up and running quickly with a well-structured template and clear installation instructions.
- **Chapter Organization:** Manage your ebook's chapters easily in individual Markdown files.
- **Navigation Made Easy:** Automatic generation of a chapter-based navigation menu (hamburger menu on non-homepage pages).
- **Customizable Themes:** Choose from multiple built-in themes to style your ebook website.
- **Fast and Lightweight:** 11ty ensures a blazing-fast website experience for your readers.
- **SEO-Friendly:** Meta tags for better search engine optimization are included. 
- **Social Links:** Make it easy for readers to find you on social media sites as well.

## Demo 🚀

Check out the live demo of this ebook template: [Demo 1](https://minimalism.putout.org/), Demo 2

## Getting Started 🛠️

Check out [PutOut documentation](https://putout.org/docs/getting-started/) for more detailed information.

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

Learn more about [deployment](https://putout.org/docs/deployment/)

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

- **Themes:** Modify or add themes in `src/_data/themes.js`.
- **Layouts:** Customize page layouts in `src/_includes/`.
- **Styles:** Adjust styles by modifying `tailwind.config.js` and `src/styles/tailwind.css`.

Learn more about [customization](https://putout.org/docs/customization/)

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting 🔧

- **Build Errors:** Ensure all dependencies are installed (`npm install`) and you're using a compatible Node.js version.
- **Styling Issues:** Check your `tailwind.config.js` and ensure you've rebuilt your CSS (`npm run build:css`).
- **Content Not Updating:** Make sure your Markdown files are in the correct location and format.

For more help, please [open an issue](https://github.com/deepakness/putout/issues).

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
