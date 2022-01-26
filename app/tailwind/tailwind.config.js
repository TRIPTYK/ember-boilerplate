/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');

/* eslint-disable */
module.exports = {
  content: ['./app/**/*.{hbs,js,ts,html}', './tests/**/*.{hbs,js,ts,html}'],
  corePlugins: {},
  plugins: [],
  theme: {
    extends: {
      screens: {
        lxg: '1140px',
        '2xl': '1600px',
        '3xl': '1680px',
      },
    },
    colors: {
      primary: '#CFAF6E',
      secondary: '#2B4999',
      text: '#647377',
      'text-secondary': '#384043',
      error: '#D72F33',
      warn: '#ffcc00',
      white : colors.white,
      black: colors.black
    },
  },
};
