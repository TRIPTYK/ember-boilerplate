// eslint-disable-next-line no-undef
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['accessibility', 'performance', 'best-practices', 'seo'],
  },
  ci: {
    collect: {
      settings: {
        onlyCategories: [
          'accessibility',
          'performance',
          'best-practices',
          'seo',
        ],
      },
      staticDistDir: './dist',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};
