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
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:performance': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
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
