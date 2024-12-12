const colors = require('tailwindcss/colors');

const extensions = ['js', 'ts', 'hbs', 'html','gjs', 'gts'];

module.exports = {
  content: [
    `./app/**/*.{${extensions.join(',')}}`,
    `./tests/**/*.{${extensions.join(',')}}`
  ],
  corePlugins: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
  theme: {
    extends: {
      screens: {
        lxg: '1140px',
        '2xl': '1600px',
        '3xl': '1680px',
      },
    },
    colors: {
      ...colors,
      warn: colors.orange,
    },
  },
};
