const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

    // Navigation plugin
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addWatchTarget("./src/styles/tailwind.css");

    eleventyConfig.addCollection("chapters", function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/chapters/*.md").sort((a, b) => {
        return a.fileSlug.localeCompare(b.fileSlug, undefined, {numeric: true, sensitivity: 'base'});
      });
    });

    eleventyConfig.addFilter("findNeighborChapters", function(collection, currentPage) {
      const currentIndex = collection.findIndex(page => page.url === currentPage.url);
      return {
        prev: collection[currentIndex - 1] || null,
        next: collection[currentIndex + 1] || null
      };
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
      return new Date(date).toLocaleDateString('en-US', {
        year: format.includes('yyyy') ? 'numeric' : undefined,
        month: format.includes('MM') ? '2-digit' : undefined,
        day: format.includes('dd') ? '2-digit' : undefined
      });
    });

    // Add the pageTitle filter
    eleventyConfig.addFilter("pageTitle", function(title, siteTitle, author, isHomepage) {
      if (isHomepage) {
        // Homepage
        return `${siteTitle} by ${author}`;
      } else if (title) {
        // Chapter pages
        return `${title} - ${siteTitle}`;
      }
      return siteTitle;
    });

    // Add this to change the permalinks for chapter files
    eleventyConfig.addGlobalData("eleventyComputed", {
      permalink: data => {
        // Check if it's a chapter file
        if (data.page.inputPath.includes("/chapters/")) {
          // Use the custom slug if provided, otherwise use the file slug
          const slug = data.customSlug || data.page.fileSlug;
          return `/${slug}/`;
        }
        // For non-chapter files, return null to use the default permalink
        return null;
      }
    });

    return {
      dir: {
        input: "src",
        output: "dist"
      }
    };
};