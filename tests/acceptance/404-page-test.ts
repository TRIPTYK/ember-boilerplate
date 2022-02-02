import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | 404 page', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /404-page', async function (assert) {
    await visit('/404');
    // should do ... nothing ?
    assert.strictEqual(currentURL(), '/404');
  });
});
