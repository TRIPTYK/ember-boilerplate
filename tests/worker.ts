/* eslint-disable no-undef */
import QUnit from 'qunit';
import type { SetupWorkerApi } from 'msw';
import { rest } from 'msw';
import { setupWorker } from 'msw';
import type { TestContext } from '@ember/test-helpers';

let worker: SetupWorkerApi;

export interface ServiceWorkerTestContext extends TestContext {
  worker: SetupWorkerApi;
}

QUnit.begin(async () => {
  worker = setupWorker();
  worker.use(
    rest.all('/write-coverage', (req) => {
      return req.passthrough();
    })
  );
  await worker.start();
  worker.printHandlers();
});

QUnit.done(async () => {
  worker.printHandlers();
  worker?.stop();
});

export function setupMock(hooks: NestedHooks) {
  hooks.beforeEach(async function () {
    worker.resetHandlers();
    this.set('worker', worker);
  });

  hooks.afterEach(function () {
    worker?.resetHandlers();
  });
}
