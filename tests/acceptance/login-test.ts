import { currentURL } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'ember-boilerplate/tests/helpers';

import { loginPage } from '../pages/login';
import { setupMock } from '../worker';
import { loginWorker } from './workers/login';

import type { ServiceWorkerTestContext } from '../worker';

module('Acceptance | login', function (hooks) {
  setupApplicationTest(hooks);
  setupMock(hooks);

  test<ServiceWorkerTestContext>('visiting /login', async function (assert) {
    await loginWorker(this.worker);
    await loginPage.visit().email('dev@triptyk.eu').password('123').submit();
    assert.strictEqual(currentURL(), '/');
  });
});
