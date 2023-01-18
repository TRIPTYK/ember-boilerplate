import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-boilerplate/tests/helpers';
import { loginPage } from '../pages/login';
import type { ServiceWorkerTestContext } from '../worker';
import { setupMock } from '../worker';
import { setupWorker } from './workers/login';

module('Acceptance | login', function (hooks) {
  setupApplicationTest(hooks);
  setupMock(hooks);

  test<ServiceWorkerTestContext>('visiting /login', async function (assert) {
    setupWorker(this.worker);
    await loginPage.visit().email('dev@triptyk.eu').password('123').submit();
    assert.strictEqual(currentURL(), '/');
  });
});
