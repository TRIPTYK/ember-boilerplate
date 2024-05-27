import env from 'ember-boilerplate/config/environment';

export default function missingMessage(key, locales) {
  const message = `[ember-intl] Missing translation for key: "${key}" for locales: "${locales}"`;

  if (env.environment === 'test' || env.environment === 'development') {
    throw new Error(message);
  }

  // eslint-disable-next-line no-console
  console.warn(message);
}
