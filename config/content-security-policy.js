module.exports = function (env) {
  const csp = {
    delivery: ['header'],
    enabled: true,
    failTests: true,
    policy: {
      'default-src': ["'none'"],
      'script-src': ["'self'"],
      'font-src': ["'self'"],
      'connect-src': ["'self'"],
      'img-src': ["'self'"],
      'style-src': ["'self'"],
      'media-src': ["'self'"],
    },
    reportOnly: true,
  };

  csp.policy['img-src'].push('https://tailwindui.com');

  if (env === 'development') {
    csp.policy['connect-src'].push('http://localhost:8080');
    csp.policy['script-src'].push("'unsafe-eval'");
  }

  if (env === 'test') {
    csp.policy['connect-src'].push('http://localhost:8080');
    csp.policy['script-src'].push("'unsafe-eval'");
  }

  if (env === 'production') {
    csp.policy['connect-src'].push('https://production');
  }

  return csp;
};
