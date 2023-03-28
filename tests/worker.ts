/* eslint-disable no-undef */
import { rest, setupWorker as MSWSetupWorker } from 'msw';
import type { SetupWorker } from 'msw';
import type { TestContext } from '@ember/test-helpers';

export let worker: SetupWorker;

export interface ServiceWorkerTestContext extends TestContext {
  worker: SetupWorker;
}

export function setupWorker() {
  worker = MSWSetupWorker();
}

export function stopWorker() {
  worker.printHandlers();
  worker.stop();
}

/**
 * The passthrough is for ember code coverage.
 */
export function setupMock(hooks: NestedHooks) {
  hooks.beforeEach(async function () {
    worker.resetHandlers();
    worker.use(
      rest.post('/write-coverage', (req) => {
        return req.passthrough();
      })
    );
    this.set('worker', worker);
  });

  hooks.afterEach(function () {
    worker?.resetHandlers();
  });
}
