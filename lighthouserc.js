// eslint-disable-next-line no-undef
module.exports = {
  extends: 'lighthouse:default',
  ci: {
    collect: {
      staticDistDir: './dist',
    },
  },
};
