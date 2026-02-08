const site = require('./site.js');

function generateGoogleFontsUrl() {
  const sansFont = site.fonts.heading;
  const serifFont = site.fonts.body;

  const fonts = [
    `family=${sansFont.replace(/\s+/g, '+')}:wght@400;600;700`,
    `family=${serifFont.replace(/\s+/g, '+')}:ital,wght@0,400;0,700;1,400`
  ];

  return `https://fonts.googleapis.com/css2?${fonts.join('&')}&display=swap`;
}

module.exports = generateGoogleFontsUrl();
