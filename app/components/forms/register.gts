import t from 'ember-intl/helpers/t';
import type { TOC } from '@ember/component/template-only';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import type validationsRegister from 'ember-boilerplate/validations/register';

export interface FormsRegisterSignature {
  Args: {
    changeset: RegisterChangeset;
    saveFunction: (changeset: RegisterChangeset) => void;
    validationSchema: typeof validationsRegister;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLFormElement;
}

const FormsRegisterSignature: TOC<FormsRegisterSignature> = <template>
    <TpkForm
      @changeset={{@changeset}}
      @onSubmit={{@saveFunction}}
      @validationSchema={{@validationSchema}}
      data-test-form="register"
      class="px-4 py-8 mt-8 bg-white rounded-lg shadow space-y-6 sm:px-10 sm:mx-auto sm:w-full sm:max-w-xl grid grid-cols-12 gap-x-6 gap-y-4"
      ...attributes
      as |F|
    >
      <F.TpkInputPrefab
        class="input_block col-span-12"
        @label={{t "components.forms.register.last_name"}}
        @validationField="lastName"
        data-test-input="lastName"
      />
      <F.TpkInputPrefab
        class="input_block col-span-12"
        @label={{t "components.forms.register.first_name"}}
        @validationField="firstName"
        data-test-input="firstName"
      />
      <F.TpkInputPrefab
        class="input_block col-span-12"
        @label={{t "components.forms.register.email"}}
        @validationField="email"
        data-test-input="email"
      />
      <F.TpkMobilePrefab
        class="input_block col-span-12"
        @label={{t "components.forms.register.phone"}}
        @validationField="phone"
        data-test-input="phone"
      />
      <F.TpkPasswordPrefab
        class="input_block col-span-12"
        @label={{t "components.forms.register.password"}}
        @validationField="password"
        data-test-input="password"
      />
      <F.TpkPasswordPrefab
        class="input_block col-span-12"
        @label={{t "components.forms.register.confirm_password"}}
        @validationField="confirmPassword"
        data-test-input="confirmPassword"
      />
      <F.TpkCurrencyPrefab
        class="input_block col-span-6"
        @label={{t "components.forms.register.gift"}}
        @validationField="gift"
        data-test-input="gift"
      />
      <button data-test-submit type="submit" class="btn col-span-12">
        <span>
          {{t "global.submit"}}
        </span>
      </button>
    </TpkForm>
  </template>;

export default FormsRegisterSignature;
