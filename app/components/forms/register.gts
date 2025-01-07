import t from 'ember-intl/helpers/t';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import type validationsRegister from 'ember-boilerplate/validations/register';
import Component from '@glimmer/component';

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
  setBirthdate = (date: unknown) => {
    this.args.changeset.set('birthDate', date as Date);
  }

  selectCategory = (category: unknown) => {
    this.args.changeset.set('category', category as string);
  }

  <template>
    <TpkForm
      @changeset={{@changeset}}
      @onSubmit={{@saveFunction}}
      @validationSchema={{@validationSchema}}
      data-test-form="register"
      class="px-4 py-8 mt-8 bg-white rounded-lg shadow-md shadow sm:px-10 sm:mx-auto sm:w-full sm:max-w-5xl grid grid-cols-12 gap-x-6"
      ...attributes
      as |F|
    >
      <fieldset class="col-span-12 grid grid-cols-12 gap-x-6">
        <h3 class="col-span-12 py-3 text-4xl border-b mb-2">
          {{t "components.forms.register.titles.account_informations"}}
        </h3>
        <F.TpkInputPrefab
          class="col-span-4"
          @label={{t "components.forms.register.email"}}
          @validationField="email"
          data-test-input="email"
        />
        <F.TpkPasswordPrefab
          class="col-span-4"
          @label={{t "components.forms.register.password"}}
          @validationField="password"
          data-test-input="password"
        />
        <F.TpkPasswordPrefab
          class="col-span-4"
          @label={{t "components.forms.register.confirm_password"}}
          @validationField="confirmPassword"
          data-test-input="confirmPassword"
        />
      </fieldset>
      <fieldset class="col-span-12 grid grid-cols-12 gap-x-6">
        <h3 class="col-span-12 py-3 text-4xl border-b mb-2">
          {{t "components.forms.register.titles.base_informations"}}
        </h3>
        <F.TpkInputPrefab
          class="col-span-4"
          @label={{t "components.forms.register.last_name"}}
          @validationField="lastName"
          data-test-input="lastName"
        />
        <F.TpkInputPrefab
          class="col-span-4"
          @label={{t "components.forms.register.first_name"}}
          @validationField="firstName"
          data-test-input="firstName"
        />
        <F.TpkDatepickerPrefab
          class="col-span-4"
          @validationField="birthDate"
          @label={{t "components.forms.register.birth_date"}}
          data-test-input="birthDate"
        />
        <F.TpkMobilePrefab
          class="col-span-6"
          @label={{t "components.forms.register.phone"}}
          @validationField="phone"
          data-test-input="phone"
        />
        <F.TpkRadioGroupPrefab
          @groupLabel={{t "components.forms.register.status.title"}}
          @validationField="status"
          data-test-input="status"
          class="col-span-6 flex gap-x-4 !flex-row flex-wrap"
          as |Radio|
        >
          <Radio
            @value="jobseeker"
            @label={{t "components.forms.register.status.jobseeker"}}
            class="[&_label]:gap-x-3"
            data-test-radio="jobseeker"
          />
          <Radio
            @value="employee"
            @label={{t "components.forms.register.status.employee"}}
            class="[&_label]:gap-x-3"
            data-test-radio="employee"
          />
          <Radio
            @value="student"
            @label={{t "components.forms.register.status.student"}}
            class="[&_label]:gap-x-3"
            data-test-radio="student"
          />
        </F.TpkRadioGroupPrefab>
      </fieldset>
      <fieldset class="col-span-12 grid grid-cols-12 gap-x-6">
        <h3 class="col-span-12 py-3 text-4xl border-b mb-2">
          {{t "components.forms.register.titles.free"}}
        </h3>
        <F.TpkCheckboxPrefab
          class="col-span-5 flex !flex-row items-center gap-x-3"
          @label={{t "components.forms.register.is_free"}}
          @validationField="isFree"
          data-test-input="isFree"
        />
        {{#if (F.changesetGet "isFree")}}
          <F.TpkDatepickerRangePrefab
            class="col-span-4"
            @label={{t "components.forms.register.period"}}
            @validationField="period"
            data-test-input="period"
          />
          <F.TpkTimepickerPrefab
            class="col-span-3"
            @label={{t "components.forms.register.time"}}
            @validationField="time"
            data-test-input="time"
          />
        {{/if}}
      </fieldset>
      <fieldset class="col-span-12 grid grid-cols-12 gap-x-6">
        <h3 class="col-span-12 py-3 text-4xl border-b mb-2">
          {{t "components.forms.register.titles.extra"}}
        </h3>
        <F.TpkSelectPrefab
          @validationField="category"
          @options={{@categories}}
          @label={{t "components.forms.register.category"}}
          @onChange={{this.selectCategory}}
          class="col-span-3"
          data-test-input="category"
        />
        <F.TpkCurrencyPrefab
          class="col-span-3"
          @label={{t "components.forms.register.gift"}}
          @validationField="gift"
          data-test-input="gift"
        />
        <F.TpkFilePrefab
          class="col-span-6"
          @label={{t "components.forms.register.cv"}}
          @validationField="cv"
          data-test-input="cv"
        />
      </fieldset>
      <div class="col-span-12 flex justify-end mt-4">
        <button data-test-submit type="submit" class="btn">
          <span>
            {{t "global.submit"}}
          </span>
        </button>
      </div>
    </TpkForm>
  </template>
}
