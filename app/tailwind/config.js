/* eslint-disable */
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  mode: 'jit',
  purge: ['./app/**/*.{hbs,js,ts}', './tests/**/*.{hbs,js,ts}'],
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  corePlugins: {},
  plugins: [],
};
