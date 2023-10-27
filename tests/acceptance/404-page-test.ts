import { module, test } from 'qunit';

import { setupApplicationTest } from 'ember-boilerplate/tests/helpers';

import { setupIntl } from 'ember-intl/test-support';

import { notFoundPage } from '../pages/404';

module('Acceptance | 404 page', function (hooks) {
  setupApplicationTest(hooks);
  setupIntl(hooks, ['fr-fr']);

  test('visiting /404-page', async function (assert) {
    await notFoundPage.visit();
    assert.true(notFoundPage.isPresent);
  });

  test('go back button works', async function (assert) {
    const oldBack = window.history.back;

    window.history.back = () => {
      assert.step('back');
    };

    await notFoundPage.visit();
    await notFoundPage.goBack();
    assert.verifySteps(['back']);
    window.history.back = oldBack;
  });
});
