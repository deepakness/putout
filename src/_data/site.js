/*
    This file makes your book title, cover, theme, social media links, and website.

    Comments (like this one or that starts with //) will help you know what a line of code does.
    Read the comment and make changes accordingly.

    You don't need to change these comment lines unless you are modifying the setting itself. 
*/

module.exports = {
  // Main site details
  title: "The Art of Baking",  // Short title of the book
  longTitle: "The Ultimate Guide to Becoming a Baking Master",  // Long title of the book (if not, keep the same as "title")
  author: "Chef Baker",  // Author's name
  description: "A comprehensive journey from novice to expert, covering essential techniques, delicious recipes, and expert tips.", // Brief description of the book
  url: "https://putout.org",  // The exact domain or subdomain where you'll be hosting
  coverImage: "/assets/cover.png",  // Address for the cover image (relative to src directory)

  // Theme selection
  theme: "default", // Options: "default", "glass", "dark", "purple", "warm"

  // Book format options
  formats: {
    pdf: true,    // Set to true to enable PDF generation
    epub: true    // Set to true to enable EPUB generation
  },

  // Social media links (optional) – remove '//' from infront of them to make them active
  socialLinks: [
    { platform: "twitter", url: "https://twitter.com/yourusername" },
    { platform: "github", url: "https://github.com/yourusername" },
    // { platform: "linkedin", url: "https://linkedin.com/in/yourusername" },
    { platform: "website", url: "https://putout.org/" }
  ]
};