const defaultTheme = require('tailwindcss/defaultTheme')
const site = require('./src/_data/site.js')

// Quote multi-word font names for valid CSS (e.g. "Playfair Display")
const q = (name) => name.includes(' ') ? `"${name}"` : name

const headingStack = [q(site.fonts.heading), ...defaultTheme.fontFamily.sans]
const bodyStack = [q(site.fonts.body), ...defaultTheme.fontFamily.sans]

module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    extend: {
      fontFamily: {
        heading: headingStack,
        body: bodyStack,
      },
      typography: {
        DEFAULT: {
          css: {
            'h1, h2, h3, h4': {
              fontFamily: headingStack.join(', '),
            },
          },
        },
      },
      colors: {
        accent: {
          50:  'rgb(var(--accent-50) / <alpha-value>)',
          100: 'rgb(var(--accent-100) / <alpha-value>)',
          200: 'rgb(var(--accent-200) / <alpha-value>)',
          300: 'rgb(var(--accent-300) / <alpha-value>)',
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          700: 'rgb(var(--accent-700) / <alpha-value>)',
          800: 'rgb(var(--accent-800) / <alpha-value>)',
          900: 'rgb(var(--accent-900) / <alpha-value>)',
          950: 'rgb(var(--accent-950) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
