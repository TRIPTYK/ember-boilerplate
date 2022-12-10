import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { notFoundPage } from '../pages/404';

module('Acceptance | 404 page', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /404-page', async function (assert) {
    assert.expect(1);
    await notFoundPage.visit();
    assert.true(notFoundPage.isPresent);
  });
});
