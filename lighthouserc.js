// eslint-disable-next-line no-undef
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['accessibility', 'performance', 'best-practices', 'seo'],
  },
  ci: {
    assert: {
      assertions: {
        'categories:pwa': 'off',
      },
    },
    collect: {
      settings: {
        // Don't run certain audits
        skipAudits: ['apple-touch-icon'],
        staticDistDir: './dist',
      },
    },
  },
};
