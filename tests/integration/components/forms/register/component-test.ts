/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { getOwner } from '@ember/application';
import { setupRenderingTest } from 'ember-boilerplate/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import { pagesFormsRegister } from 'ember-boilerplate/tests/pages/forms/register';
import type IntlService from 'ember-intl/services/intl';
import validationsRegister from 'ember-boilerplate/validations/register';

interface RegisterTestContext extends TestContext {
  changeset: RegisterChangeset;
  saveFunction: (changeset: RegisterChangeset) => void;
}

module('Integration | Component | forms/register', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ['fr-fr']);

  let changeset: RegisterChangeset;

  hooks.beforeEach<RegisterTestContext>(function () {
    changeset = new RegisterChangeset({
      email: 'test@triptyk.eu',
      lastName: 'triptyk',
      firstName: 'papa',
      phone: '+32 498542257',
      gift: 1000,
      password: '',
      confirmPassword: '',
    });

    this.set('changeset', changeset);
  });

  function renderForm() {
    return render(
      hbs`
        <Forms::Register
            @changeset={{this.changeset}}
            @saveFunction={{this.saveFunction}}
            @validationSchema={{this.validationSchema}}
          >
          <Inputs::CancelButton data-test-cancel>
            {{t "global.cancel"}}
          </Inputs::CancelButton>
          <TpkButton type="submit" data-test-submit>
            {{t "global.create"}}
          </TpkButton>
        </Forms::Register>
      `,
    );
  }

  test('Submit with missing field returns errors', async function (assert) {
    // Testing makes Amaury happy so do your tests
    this.set('saveFunction', () => {});
    this.set('validationSchema', validationsRegister);
    await renderForm();
    await pagesFormsRegister.submit();
    assert.true(pagesFormsRegister.errors.length > 0);
  });

  // note : saveFunction when form is valid is already tested by the component YupForm. No need to test this behavior in the future.
  test('Edit form and trigger saveFunction', async function (assert) {
    this.set('saveFunction', (changeset: RegisterChangeset) => {
      assert.strictEqual(changeset.get('lastName'), 'triptyk');
      assert.strictEqual(changeset.get('firstName'), 'papa');
      assert.strictEqual(changeset.get('email'), 'test@triptyk.eu');
      assert.strictEqual(changeset.get('phone'), '+32 498542257');
      assert.strictEqual(+changeset.get('gift'), 234.23);
      assert.strictEqual(changeset.get('password'), 'hello');
      assert.strictEqual(changeset.get('confirmPassword'), 'hello');
      assert.step('saveFunction');
    });
    this.set('validationSchema', validationsRegister);
    await renderForm();

    await pagesFormsRegister
      .gift('234,23 €')
      .password('hello')
      .confirmPassword('hello');

    await pagesFormsRegister.submit();
    assert.verifySteps(['saveFunction']);
  });

  test('confirmPassword which does not match password returns an error', async function (assert) {
    assert.expect(1);
    const intl = getOwner(this)?.lookup('service:intl') as IntlService;
    this.set('saveFunction', () => {});
    this.set('validationSchema', validationsRegister);
    await renderForm();

    await pagesFormsRegister.password('hello').confirmPassword('hellos');

    await pagesFormsRegister.submit();

    assert.true(
      pagesFormsRegister.errors[0]?.text?.includes(
        intl.t('validations.confirm_password.not_matching'),
      ),
    );
  });
});
