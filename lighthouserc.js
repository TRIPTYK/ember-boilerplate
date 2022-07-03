module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['accessibility', 'performance', 'best-practices', 'seo'],
  },
  ci: {
    assert: {
      assertions: {
        'categories:pwa': 'off',
        'categories:accessibility': ['error', { minScore: 0.75 }],
        'categories:performance': ['error', { minScore: 0.75 }],
        'categories:best-practices': ['error', { minScore: 0.75 }],
        'categories:seo': ['error', { minScore: 0.5 }],
      },
    },
    collect: {
      startServerReadyTimeout: 120 * 1000,
      startServerReadyPattern: 'Serving on',
      isSinglePageApplication: true,
      startServerCommand: 'ember serve -prod  --live-reload=false',
      url: ['http://localhost:4200/dashboard', 'http://localhost:4200/login'],
      settings: {
        // Don't run certain audits
        skipAudits: ['apple-touch-icon'],
        // If we need auth later
        // extraHeaders: "{\"Cookie\": \"token=1234\"}"
      },
    },
  },
};
