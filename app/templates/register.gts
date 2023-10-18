import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import FormsRegister from 'ember-boilerplate/components/forms/register';
import LoginLayout from 'ember-boilerplate/components/login-layout';
import t from 'ember-boilerplate/helpers/t';
import formsRegisterSchema from 'ember-boilerplate/validations/register';
import RouteTemplate from 'ember-route-template';

import type RegisterChangesetService from 'ember-boilerplate/services/changesets/register';
import type ErrorHandlerService from 'ember-boilerplate/services/error-handler';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

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
      password: '',
      confirmPassword: '',
    });
  }

  @action
  async saveRegister(changeset: RegisterChangeset) {
    try {
      await this.register.save(changeset);
      this.flashMessages.success('components.pages.register.success_message');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default RouteTemplate(RegisterRouteComponent);
