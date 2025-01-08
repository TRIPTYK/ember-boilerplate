import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
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
import type { RouteTemplateSignature } from 'ember-boilerplate/utils/route-template';
import type RegisterRoute from 'ember-boilerplate/routes/register';
import type { IntlService } from 'ember-intl';

class RegisterRouteComponent extends Component<RouteTemplateSignature<RegisterRoute>> {
  @service declare flashMessages: FlashMessageService;
  @service declare intl: IntlService;
  @service('changesets/register') declare register: RegisterChangesetService;
  @service declare errorHandler: ErrorHandlerService;
  @tracked declare changeset: RegisterChangeset;

  validationSchema = formsRegisterSchema;

  constructor(owner: unknown, args: RouteTemplateSignature<RegisterRoute>['Args']) {
    super(owner, args);
    this.changeset = new RegisterChangeset({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      gift: 0,
      birthDate: null,
      category: '',
      cv: null,
      isFree: false,
      time: null,
      status: null,
      period: null,
      password: '',
      confirmPassword: '',
    });
  }

  saveRegister = async (changeset: RegisterChangeset) => {
    const user = await this.register.save(changeset);

    if (user.isErr) {
      return this.errorHandler.handle(user.error.message);
    }

    return this.flashMessages.success(
      this.intl.t('components.templates.register.success_message'),
      {
        timeout: 5000000,
      }
    );
  };

  <template>
    <LoginLayout @title={{t "components.templates.register.title"}}>
      <RegisterForm
        @categories={{array "Plaisir" "Sérieux"}}
        @changeset={{this.changeset}}
        @validationSchema={{this.validationSchema}}
        @saveFunction={{this.saveRegister}}
      />
    </LoginLayout>
  </template>
}

export default RouteTemplate(RegisterRouteComponent);
