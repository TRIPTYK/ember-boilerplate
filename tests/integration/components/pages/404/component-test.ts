import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | pages/404', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ['fr-fr']);

  test('it renders', async function (assert) {
    assert.expect(0);
  });
});
