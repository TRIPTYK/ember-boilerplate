import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import RegisterForm from 'ember-boilerplate/components/forms/register';
import LoginLayout from 'ember-boilerplate/components/login-layout';
import formsRegisterSchema from 'ember-boilerplate/validations/register';
import t from 'ember-intl/helpers/t';
import RouteTemplate from 'ember-route-template';

import type RegisterChangesetService from 'ember-boilerplate/services/changesets/register';
import type ErrorHandlerService from 'ember-boilerplate/services/error-handler';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import { array } from '@ember/helper';

export interface RegisterRouteComponentSignature {
  Args: {};
}

class RegisterRouteComponent extends Component<RegisterRouteComponentSignature> {
  @service declare flashMessages: FlashMessageService;
  @service('changesets/register') declare register: RegisterChangesetService;
  @service declare errorHandler: ErrorHandlerService;
  @tracked declare changeset: RegisterChangeset;

  validationSchema = formsRegisterSchema;

  constructor(owner: unknown, args: RegisterRouteComponentSignature['Args']) {
    super(owner, args);
    this.changeset = new RegisterChangeset({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      gift: 0,
      birthDate: undefined,
      category: '',
      password: '',
      confirmPassword: '',
    });
  }

  @action
  async saveRegister(changeset: RegisterChangeset) {
    const user = await this.register.save(changeset);

    if (user.isErr) {
      console.log(user.error.message);

      return this.errorHandler.handle(user.error.message);
    }

    return this.flashMessages.success('components.templates.register.success_message');
  }

  <template>
    <LoginLayout @title={{t "components.templates.register.title"}}>
      <RegisterForm
        @categories={{array 'bonjour' 'au revoir' 'caca'}}
        @changeset={{this.changeset}}
        @validationSchema={{this.validationSchema}}
        @saveFunction={{this.saveRegister}}
      />
    </LoginLayout>
  </template>
}

export default RouteTemplate(RegisterRouteComponent);
