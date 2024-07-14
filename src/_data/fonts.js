const tailwindConfig = require('../../tailwind.config.js');

function generateGoogleFontsUrl() {
  const { theme } = tailwindConfig;
  const sansFont = theme.extend.fontFamily.sans[0];
  const serifFont = theme.extend.fontFamily.serif[0];
  
  const fonts = [
    `family=${sansFont.replace(/\s+/g, '+')}:wght@400;600;700`,
    `family=${serifFont.replace(/\s+/g, '+')}:ital,wght@0,400;0,700;1,400`
  ];
  
  return `https://fonts.googleapis.com/css2?${fonts.join('&')}&display=swap`;
}

module.exports = generateGoogleFontsUrl();