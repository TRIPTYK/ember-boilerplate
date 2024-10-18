import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import type { TOC } from '@ember/component/template-only';
import type { LoginChangeset } from 'ember-boilerplate/changesets/login';
import type { Schema } from 'yup';
import t from 'ember-intl/helpers/t';
import { LinkTo } from '@ember/routing';

export interface FormsLoginSignature {
  Args: {
    changeset: LoginChangeset;
    saveFunction: (changeset: LoginChangeset) => unknown;
    validationSchema: Schema;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLFormElement;
}

const FormsLogin: TOC<FormsLoginSignature> = <template>
  <TpkForm
    class="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md"
    @onSubmit={{@saveFunction}}
    @changeset={{@changeset}}
    @validationSchema={{@validationSchema}}
    data-test-form-login
    as |F|
  >
    <F.TpkEmailPrefab
      @label={{t "components.forms.login.email"}}
      @validationField="email"
      class="input_block"
      data-test-input="email"
    />
    <F.TpkPasswordPrefab
      @label={{t "components.forms.login.password"}}
      @validationField="password"
      class="input_block"
      data-test-input="password"
    />
    <div class="flex items-center justify-between">
      <div class="text-sm">
        <LinkTo @route="forgot-password" class="font-medium text-primary hover:text-secondary">
          {{t "components.forms.login.forgot_password"}}
        </LinkTo>
      </div>
    </div>
    <div>
      <button data-test-submit type="submit" class="btn">
        <span>
          {{t "components.forms.login.log_in"}}
        </span>
      </button>
    </div>
  </TpkForm>
</template>;

export default FormsLogin;
