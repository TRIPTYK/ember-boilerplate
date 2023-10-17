import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type IntlService from 'ember-intl/services/intl';
import type RegisterChangesetService from 'ember-boilerplate/services/changesets/register';
import formsRegisterSchema from 'ember-boilerplate/validations/register';
import type ErrorHandlerService from 'ember-boilerplate/services/error-handler';
import LoginLayout from 'ember-boilerplate/components/login-layout';
import FormsRegister from 'ember-boilerplate/components/forms/register';
import t from 'ember-intl/helpers/t';

interface PagesRegisterArgs {
  changeset: RegisterChangeset;
}

export default class PagesRegister extends Component<PagesRegisterArgs> {
  @service declare flashMessages: FlashMessageService;
  @service declare intl: IntlService;
  @service('changesets/register') declare register: RegisterChangesetService;
  @service declare errorHandler: ErrorHandlerService;
  @tracked declare changeset: RegisterChangeset;

  validationSchema = formsRegisterSchema;

  constructor(owner: unknown, args: PagesRegisterArgs) {
    super(owner, args);
    this.changeset = new RegisterChangeset({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      gift: 0,
      password: '',
      confirmPassword: '',
    });
  }

  @action
  async saveRegister(changeset: RegisterChangeset) {
    try {
      await this.register.save(changeset);
      this.flashMessages.success(
        this.intl.t('components.pages.register.success_message'),
      );
    } catch (e: any) {
      const error = await e;
      this.errorHandler.handle(changeset, error.errors);
    }
  }

  <template>
    <LoginLayout @title={{t "components.pages.register.title"}}>
      <FormsRegister
        @changeset={{this.changeset}}
        @validationSchema={{this.validationSchema}}
        @saveFunction={{this.saveRegister}}
      />
    </LoginLayout>
  </template>
}
