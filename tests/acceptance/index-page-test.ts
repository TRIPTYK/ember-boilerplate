import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-boilerplate/tests/helpers';

module('Acceptance | index page', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /index-page', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
  });
});
