import { http, passthrough } from 'msw';
import { setupWorker as MSWSetupWorker } from 'msw/browser';

import type { TestContext } from '@ember/test-helpers';
import type { SetupWorker as Worker } from 'msw/browser';

export let worker: Worker;

export interface ServiceWorkerTestContext extends TestContext {
  worker: Worker;
}

export function setupWorker() {
  worker = MSWSetupWorker();
}

export function stopWorker() {
  worker.stop();
}

/**
 * Setups mocking using msw worker.
 * The worker can be accessed using this.get('worker')
 */
export function setupMock(hooks: NestedHooks) {
  hooks.beforeEach(async function () {
    worker.resetHandlers();
    worker.use(
      http.post('/write-coverage', () => {
        // The passthrough is for ember code coverage.
        return passthrough();
      })
    );
    this.set('worker', worker);
  });

  hooks.afterEach(function () {
    worker?.resetHandlers();
  });
}
