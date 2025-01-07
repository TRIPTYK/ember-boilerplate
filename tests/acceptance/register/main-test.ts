import { currentURL } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'ember-boilerplate/tests/helpers';
import indexPage from 'ember-boilerplate/tests/pages/pages/register/index';

import { setupIntl } from 'ember-intl/test-support';

import { setupMock } from '../../worker';
import { registerWorker, registerWorkerWithErrors } from '../workers/register';

import type { ServiceWorkerTestContext } from '../../worker';
import { setTempusDominusDate } from '@triptyk/ember-input/test-support/datepicker-helpers';
import { selectChoose } from 'ember-power-select/test-support';
import { triggerEvent } from '@ember/test-helpers';
import { pauseTest } from '@ember/test-helpers';

module('Acceptance | register', function (hooks) {
  setupApplicationTest(hooks);
  setupMock(hooks);
  setupIntl(hooks, 'fr-fr');

  async function completeFormAndSubmit() {
    const date1 = new Date(2022, 0, 1, 22, 30, 0);
    const date2 = new Date(2023, 0, 1, 22, 30, 0);

    await indexPage.forms
      .email('test@triptyk.eu')
      .phone('+32 498542256')
      .lastName('triptyk')
      .firstName('papa')
      .gift('1.000,45 €')
      .password('hell')
      .confirmPassword('hell');

      setTempusDominusDate('[data-test-input="birthDate"] .tpk-datepicker-input', date1);
      await indexPage.forms.isFree();
      await indexPage.forms.isFree();

      await indexPage.forms.status.jobseeker();
      await selectChoose('[data-test-input="category"]', '.ember-power-select-option', 1);

      setTempusDominusDate('[data-test-input="period"] .tpk-datepicker-range-input', date1, 0);
      setTempusDominusDate('[data-test-input="period"] .tpk-datepicker-range-input', date2, 1);

      setTempusDominusDate('[data-test-input="time"] .tpk-timepicker-input', date1);

      await triggerEvent('[data-test-input="cv"] .tpk-file-input', 'change', {
        files: [new File(['Ember Rules!'], 'file.txt')],
      });
      await indexPage.forms.submit();
  }

  test('visit register', async function (assert) {
    await indexPage.visit();

    assert.strictEqual(currentURL(), '/register');
  });

  test<ServiceWorkerTestContext>('show sucess message when save form', async function (assert) {
    await registerWorker(this.worker);
    await indexPage.visit();
    await completeFormAndSubmit();

    assert.ok(indexPage.hasSuccess);
  });

  test<ServiceWorkerTestContext>('show error message and error in changeset', async function (assert) {
    await registerWorkerWithErrors(this.worker);
    await indexPage.visit();
    await completeFormAndSubmit();
    await indexPage.forms
      .email('test@triptyk');

    assert.ok(indexPage.hasError);
  });
});
