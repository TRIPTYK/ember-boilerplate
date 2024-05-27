/* eslint-disable max-statements */
import { currentURL } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'ember-boilerplate/tests/helpers';
import indexPage from 'ember-boilerplate/tests/pages/pages/register/index';

import { setupIntl } from 'ember-intl/test-support';

import { setupMock } from '../../worker';
import { registerWorker, registerWorkerWithErrors } from '../workers/register';

import type { ServiceWorkerTestContext } from '../../worker';

module('Acceptance | register', function (hooks) {
  setupApplicationTest(hooks);
  setupMock(hooks);
  setupIntl(hooks, ['fr-fr']);

  async function completeFormAndSubmit() {
    await indexPage.forms
      .email('test@triptyk.eu')
      .phone('+32 498542256')
      .lastName('triptyk')
      .firstName('papa')
      .gift('1.000,45 €')
      .password('hell')
      .confirmPassword('hell')
      .submit();
  }

  test('visit register', async function (assert) {
    await indexPage.visit();

    assert.strictEqual(currentURL(), '/register');
  });

  test<ServiceWorkerTestContext>('show sucess message when save form', async function (assert) {
    await registerWorker(this.worker);
    await indexPage.visit();
    await indexPage.forms
      .email('test@triptyk.eu')
      .phone('+32 498542256')
      .lastName('triptyk')
      .firstName('papa')
      .gift('1.000,45 €')
      .password('hello')
      .confirmPassword('hello')
      .submit();

    assert.ok(indexPage.hasSuccess);
  });

  test<ServiceWorkerTestContext>('show error message and error in changeset', async function (assert) {
    await registerWorkerWithErrors(this.worker);
    await indexPage.visit();
    await completeFormAndSubmit();

    assert.ok(indexPage.hasError);
  });
});
