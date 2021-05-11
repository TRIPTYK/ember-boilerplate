/* eslint-disable */
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  mode: 'jit',
  purge: {
    enabled: true,
    content : ['./app/**/*.{hbs,js,ts}', './tests/**/*.{hbs,js,ts}']
  },
  corePlugins: {},
  plugins: [],
};
