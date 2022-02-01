/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import type FetchService from 'ember-boilerplate/services/fetch';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Service | fetch', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  // Replace this with your real tests.
  test('It requests internally', async function (assert) {
    let service = this.owner.lookup('service:fetch') as FetchService;
    const users = await service.request('users');
    assert.strictEqual(users.status, 200);
  });

  // Replace this with your real tests.
  test('It throws when code is >= 400', async function (assert) {
    let service = this.owner.lookup('service:fetch') as FetchService;
    try {
      await service.request('not-found');
    } catch (e) {
      assert.strictEqual(e.status, 404);
      assert.step('throw');
    }
    assert.verifySteps(['throw']);
  });
});
