/*
    PutOut — Site Configuration
    ===========================
    This is the main config file for your ebook website.
    Edit the values below to customize your site.
*/

module.exports = {

  // ─── BOOK DETAILS ──────────────────────────────────────────
  title: "The Art of Baking",                                   // Short title (shown in header & browser tab)
  longTitle: "The Ultimate Guide to Becoming a Baking Master",  // Full title (shown on homepage hero)
  author: "Chef Baker",                                         // Author name
  description: "A comprehensive journey from novice to expert, covering essential techniques, delicious recipes, and expert tips.",
  url: "https://example.com",                                    // Your site's URL (no trailing slash)
  coverImage: "/assets/cover.png",                              // Cover image path — remove or comment out this line to hide the cover image

  // ─── APPEARANCE ────────────────────────────────────────────
  theme: "emerald",        // Options: "emerald", "indigo", "rose", "amber", "blue", "violet", "teal", "orange"

  // Font families — any Google Font name works (e.g. "Poppins", "Fira Code", "Lora")
  // Restart the dev server after changing fonts
  fonts: {
    heading: "Inter",           // Used for headings, nav, buttons
    body: "Inter",              // Used for body/prose text
  },

  // ─── FORMATS ───────────────────────────────────────────────
  formats: {
    pdf: true,     // Auto-generate a downloadable PDF
    epub: true,    // Auto-generate a downloadable EPUB
  },

  // ─── BRANDING ─────────────────────────────────────────────
  showBranding: true,   // Show "Built with PutOut" in the footer

  // ─── SOCIAL LINKS ──────────────────────────────────────────
  // Remove the // from a line to activate it. Delete lines you don't need.
  socialLinks: [
    { platform: "twitter", url: "https://twitter.com/yourusername" },
    { platform: "github", url: "https://github.com/yourusername" },
    // { platform: "linkedin", url: "https://linkedin.com/in/yourusername" },
    // { platform: "website", url: "https://yourwebsite.com/" },
  ],
};
