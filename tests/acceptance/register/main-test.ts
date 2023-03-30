/* eslint-disable max-statements */
import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-boilerplate/tests/helpers';
import indexPage from 'ember-boilerplate/tests/pages/pages/register/index';

module('Acceptance | register', function (hooks) {
  setupApplicationTest(hooks);

  test('visit register', async function (assert) {
    await indexPage.visit();

    assert.strictEqual(currentURL(), '/register');
  });
});
