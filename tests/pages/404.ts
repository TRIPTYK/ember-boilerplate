import { create, visitable } from 'ember-cli-page-object';

export const notFoundPage = create({
  visit: visitable('/not-exists'),
  scope: '[data-test-page="404"]',
});
