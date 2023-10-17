import { currentURL,visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'ember-boilerplate/tests/helpers';

module('Acceptance | index page', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /index-page', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
  });
});
