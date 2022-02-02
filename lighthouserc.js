// eslint-disable-next-line no-undef
module.exports = {
  extends: 'lighthouse:default',
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
      assertions: {
        'categories:pwa': 'off',
      },
    },
  },
};
