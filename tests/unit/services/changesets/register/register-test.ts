/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';

import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import { setupTest } from 'ember-boilerplate/tests/helpers';
import { setupMock } from 'ember-boilerplate/tests/worker';

import { changesetInitialData } from './changesets';
import { failHandle, successHandle } from './mocks';

import type RegisterChangesetService from 'ember-boilerplate/services/changesets/register';
import type { ServiceWorkerTestContext } from 'ember-boilerplate/tests/worker';

module('Unit | Service | changesets/register', function (hooks) {
  setupTest(hooks);
  setupMock(hooks);

  let service: RegisterChangesetService;

  hooks.beforeEach(function () {
    service = this.owner.lookup('service:changesets/register') as RegisterChangesetService;
  });

  async function setupSuccessHandlers(this: ServiceWorkerTestContext) {
    this.worker.use(successHandle);
    await this.worker.start();
  }

  async function setupFailedHandlers(this: ServiceWorkerTestContext) {
    this.worker.use(failHandle);
    await this.worker.start();
  }

  function saveChangeset() {
    return service.save(new RegisterChangeset(changesetInitialData));
  }

  test<ServiceWorkerTestContext>('It returns user model with adequate attributes', async function (assert) {
    await setupSuccessHandlers.call(this);

    const user = await saveChangeset();

    assert.strictEqual(user.firstName, changesetInitialData.firstName);
    assert.strictEqual(user.lastName, changesetInitialData.lastName);
    assert.strictEqual(user.role, 'user');
    assert.strictEqual(user.phone, changesetInitialData.phone);
    assert.strictEqual(user.password, null);
  });

  test<ServiceWorkerTestContext>('It throws on backend error response', async function (assert) {
    await setupFailedHandlers.call(this);

    await assert.rejects(saveChangeset());
  });
});
