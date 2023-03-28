import { clickable, create, visitable } from 'ember-cli-page-object';

export const notFoundPage = create({
  visit: visitable('/not-exists'),
  goBack: clickable('[data-test-btn-back]'),
  scope: '[data-test-page="404"]',
});
