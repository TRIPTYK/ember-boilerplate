/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import type FetchService from 'ember-boilerplate/services/fetch';
import type { ServiceWorkerTestContext } from 'ember-boilerplate/tests/worker';
import { setupMock } from 'ember-boilerplate/tests/worker';
import { fetchWorker } from './workers/fetch';
import { Response } from 'fetch';

module('Unit | Service | fetch', function (hooks) {
  setupTest(hooks);
  setupMock(hooks);

  hooks.beforeEach<ServiceWorkerTestContext>(function () {
    fetchWorker(this.worker);
  });

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
      if (e instanceof Response) {
        // eslint-disable-next-line qunit/no-conditional-assertions
        assert.strictEqual(e.status, 404);
        assert.step('throw');
      }
    }
    assert.verifySteps(['throw']);
  });
});
