import { setBuildURLConfig } from '@ember-data/request-utils';
import type TpkFormService from '@triptyk/ember-input-validation/services/tpk-form';
import InputsValidationComponent from 'ember-boilerplate/components/inputs/input-validation';
import config from 'ember-boilerplate/config/environment';
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from 'ember-qunit';

import type { SetupTestOptions } from 'ember-qunit';

// This file exists to provide wrappers around ember-qunit's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

function setupApplicationTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupApplicationTest(hooks, options);

  // Additional setup for application tests can be done here.
  //
  // For example, if you need an authenticated session for each
  // application test, you could do:
  //
  // hooks.beforeEach(async function () {
  //   await authenticateSession(); // ember-simple-auth
  // });
  //
  // This is also a good place to call test setup functions coming
  // from other addons:
  //
}

function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupRenderingTest(hooks, options);

  hooks.beforeEach(function () {
    (this.owner.lookup('service:tpk-form') as TpkFormService).TpkInput = InputsValidationComponent as never;
  });
  // Additional setup for rendering tests can be done here.
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupTest(hooks, options);

  setBuildURLConfig({
    host: config.host,
    namespace: config.namespace,
  });
  // Additional setup for unit tests can be done here.
}

export { setupApplicationTest, setupRenderingTest, setupTest };
