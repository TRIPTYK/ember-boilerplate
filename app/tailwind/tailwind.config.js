const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{hbs,js,ts,html}',
    './tests/**/*.{hbs,js,ts,html}',
    './node_modules/@triptyk/tpk-ember-input/addon/**/*.{hbs,ts}',
  ],
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
      background: '#F2F2F2',
      'background-disabled': '#F6F6F6',
      'text-secondary': '#384043',
      error: '#D72F33',
      warn: '#ffcc00',
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      red: colors.red,
      gray: colors.gray,
    },
  },
};
