import t from 'ember-intl/helpers/t';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import type validationsRegister from 'ember-boilerplate/validations/register';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface FormsRegisterSignature {
  Args: {
    changeset: RegisterChangeset;
    categories: string[];
    saveFunction: (changeset: RegisterChangeset) => void;
    validationSchema: typeof validationsRegister;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLFormElement;
}

export default class FormsRegister extends Component<FormsRegisterSignature> {
  @action
  setBirthdate(date: unknown) {
    this.args.changeset.set('birthDate', date as Date);
  }

  @action
  selectCategory(category: unknown) {
    this.args.changeset.set('category', category as string);
  }

  <template>
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
      <F.TpkDatepicker class="col-span-12" @validationField="birthDate" @label={{t "components.forms.register.birth_date"}} @onChange={{this.setBirthdate}} as |D|>
        <D.Label />
        <D.Input />
      </F.TpkDatepicker>
      <F.TpkSelectPrefab
        @validationField="category"
        @options={{@categories}}
        @label={{t "components.forms.register.category"}}
        @onChange={{this.selectCategory}}
        class="col-span-12"
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
}
