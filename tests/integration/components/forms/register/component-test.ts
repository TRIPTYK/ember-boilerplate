import { module, test } from 'qunit';
import { getOwner } from '@ember/application';
import { setupRenderingTest } from 'ember-boilerplate/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { createChangeset } from 'ember-form-changeset-validations/changeset/create-changeset';
import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import formsRegisterValidation from 'ember-boilerplate/validations/register';
import { pagesFormsRegister } from 'ember-boilerplate/tests/pages/forms/register';
import type { ProxyWrappedChangeset } from 'ember-form-changeset-validations';
import type IntlService from 'ember-intl/services/intl';

interface RegisterTestContext extends TestContext {
  changeset: RegisterChangeset;
  saveFunction: (changeset: RegisterChangeset) => void;
}

module('Integration | Component | forms/register', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ['fr-fr']);

  let changeset: ProxyWrappedChangeset<RegisterChangeset>;

  hooks.beforeEach<RegisterTestContext>(function () {
    changeset = createChangeset(
      RegisterChangeset,
      {
        email: 'test@triptyk.eu',
        lastName: 'triptyk',
        firstName: 'papa',
        phone: '+32 498542257',
        gift: '1000',
        password: '',
        confirmPassword: '',
      },
      formsRegisterValidation
    );

    this.set('changeset', changeset);
  });

  function renderForm() {
    return render(
      hbs`
        <Forms::Register
            @changeset={{this.changeset}}
            @saveFunction={{this.saveFunction}}
          >
          <Inputs::CancelButton data-test-cancel>
            {{t "global.cancel"}}
          </Inputs::CancelButton>
          <TpkButton type="submit" data-test-submit>
            {{t "global.create"}}
          </TpkButton>
        </Forms::Register>
      `
    );
  }

  test('Submit without complete missing field returns errors', async function (assert) {
    // Testing makes Amaury happy so do your tests
    this.set('saveFunction', () => {});
    await renderForm();
    await pagesFormsRegister.submit();
    assert.true(pagesFormsRegister.errors.length > 0);
  });

  test('Edit form and trigger saveFunction', async function (assert) {
    assert.expect(9);
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
    await renderForm();

    await pagesFormsRegister
      .gift('234,23 €')
      .password('hello')
      .confirmPassword('hello');

    await pagesFormsRegister.submit();
    assert.verifySteps(['saveFunction']);
  });

  test('confirmPassword not match password and return an error', async function (assert) {
    assert.expect(1);
    const intl = getOwner(this)?.lookup('service:intl') as IntlService;
    this.set('saveFunction', () => {});
    await renderForm();

    await pagesFormsRegister.password('hello').confirmPassword('hellos');

    await pagesFormsRegister.submit();

    assert.true(
      pagesFormsRegister.errors[0]?.text?.includes(
        intl.t('validations.confirmPassword.notMatching')
      )
    );
  });
});
