// eslint-disable-next-line no-undef
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['accessibility', 'performance', 'best-practices', 'seo'],
  },
  ci: {
    collect: {
      settings: {
        // Don't run certain audits
        skipAudits: ['pwa'],
        staticDistDir: './dist',
      },
    },
  },
};
