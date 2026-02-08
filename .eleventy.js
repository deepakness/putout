const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

    // Navigation plugin
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Ignore the chapter template file (underscore prefix doesn't auto-exclude in content dirs)
    eleventyConfig.ignores.add("src/chapters/_chapter-template.md");

    // Static file passthrough — copies these directories as-is into dist/
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/scripts");

    // Watch Tailwind's compiled CSS in dist/ so the dev server reloads on CSS changes.
    // src/styles is NOT passthrough-copied because it contains raw @tailwind directives
    // that would overwrite the compiled CSS output from the Tailwind CLI.
    eleventyConfig.setServerOptions({
        watch: ["dist/styles/**/*.css"]
    });

    // Chapter collection — all Markdown files in src/chapters/, sorted by filename number.
    eleventyConfig.addCollection("chapters", function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/chapters/*.md").sort((a, b) => {
        return a.fileSlug.localeCompare(b.fileSlug, undefined, {numeric: true, sensitivity: 'base'});
      });
    });

    // Returns the previous and next chapter relative to the current page
    eleventyConfig.addFilter("findNeighborChapters", function(collection, currentPage) {
      const currentIndex = collection.findIndex(page => page.url === currentPage.url);
      return {
        prev: collection[currentIndex - 1] || null,
        next: collection[currentIndex + 1] || null
      };
    });

    // Returns the 0-based index of the current page within the chapters collection
    eleventyConfig.addFilter("findChapterIndex", function(collection, currentPage) {
      const idx = collection.findIndex(page => page.url === currentPage.url);
      return idx >= 0 ? idx : null;
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
      return new Date(date).toLocaleDateString('en-US', {
        year: format.includes('yyyy') ? 'numeric' : undefined,
        month: format.includes('MM') ? '2-digit' : undefined,
        day: format.includes('dd') ? '2-digit' : undefined
      });
    });

    // Reading time estimate (words / 200 wpm, minimum 1 min)
    eleventyConfig.addFilter("readingTime", function(content) {
      const words = (content || '').split(/\s+/).filter(Boolean).length;
      const minutes = Math.ceil(words / 200);
      return minutes;
    });

    eleventyConfig.addFilter("pageTitle", function(title, siteTitle, author, isHomepage) {
      if (isHomepage) {
        return `${siteTitle} by ${author}`;
      } else if (title) {
        return `${title} - ${siteTitle}`;
      }
      return siteTitle;
    });

    return {
      dir: {
        input: "src",
        output: "dist"
      }
    };
};
