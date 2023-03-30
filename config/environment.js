'use strict';

module.exports = function (environment) {
  const host = 'http://localhost:8080';
  const namespace = 'api/v1';

  let ENV = {
    modulePrefix: 'ember-boilerplate',
    applicationName: 'Ember boilerplate',
    podModulePrefix: '',
    environment,
    host,
    namespace,
    rootURL: '/',
    locationType: 'history',
    'changeset-validations': { rawOutput: true },
    'ember-simple-auth-token': {
      tokenDataPropertyName: 'tokenData', // Key in session to store token data
      refreshAccessTokens: true, // Enables access token refreshing
      tokenExpirationInvalidateSession: true, // Enables session invalidation on token expiration
      serverTokenEndpoint: `${host}/${namespace}/auth/login`,
      serverTokenRefreshEndpoint: `${host}/${namespace}/auth/refresh-token`, // Server endpoint to send refresh request
      refreshTokenPropertyName: 'refreshToken', // Key in server response that contains the refresh token
      tokenPropertyName: 'accessToken',
      tokenExpireName: 'exp', // Field containing token expiration
      refreshLeeway: 10, // Amount of time in seconds to send refresh request before token expiration
      tokenRefreshInvalidateSessionResponseCodes: [401, 403, 500], // Array of response codes that cause an immediate session invalidation if received when attempting to refresh the token
      refreshAccessTokenRetryAttempts: 0, // Number of token retry attempts to make
      refreshAccessTokenRetryTimeout: 1000, // Amount of time in milliseconds to wait between token refresh retry attempts
      tokenRefreshFailInvalidateSession: true, // Enables session invalidation if all token refresh retry requests fail
    },
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
