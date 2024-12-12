import Component from '@glimmer/component';

import { service } from '@ember/service';

import { ResetPasswordChangeset } from 'ember-boilerplate/changesets/reset-password';
import FormsPasswordRecovery from 'ember-boilerplate/components/forms/password-recovery';
import LoginLayout from 'ember-boilerplate/components/login-layout';
import passwordRecoveryValidation from 'ember-boilerplate/validations/reset-password';
import t from 'ember-intl/helpers/t';
import RouteTemplate from 'ember-route-template';
import { tracked } from 'tracked-built-ins';

import type RouterService from '@ember/routing/router-service';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type RequestManager from '@ember-data/request';
import type ResetPasswordRoute from 'ember-boilerplate/routes/reset-password';
import type { RouteTemplateSignature } from 'ember-boilerplate/utils/route-template';
import type ResetPasswordController from 'ember-boilerplate/controllers/reset-password';

class ResetPasswordRouteComponent extends Component<RouteTemplateSignature<ResetPasswordRoute, ResetPasswordController>> {
  @service declare requestManager: RequestManager;
  @service declare router: RouterService;
  @service declare flashMessages: FlashMessageService;
  @tracked changeset: ResetPasswordChangeset;

  validationSchema = passwordRecoveryValidation;

  constructor(owner: unknown, args: RouteTemplateSignature<ResetPasswordRoute, ResetPasswordController>['Args']) {
    super(owner, args);
    this.changeset = new ResetPasswordChangeset({
      password: '',
      confirmPassword: '',
    });
  }

  recoverPassword = async (changeset: ResetPasswordChangeset) => {
    try {
      await this.requestManager.request({
        url: `auth/set-password/${this.args.model.token}`,
        body: JSON.stringify({
          password: changeset.get('password'),
        }),
        method: 'POST',
      });
      this.flashMessages.success('Password has been reset.');
      await this.router.transitionTo('login');
    } catch (e) {
      this.flashMessages.danger('An error occured');
    }
  }

  <template>
    <LoginLayout @title={{t "components.templates.reset-password.title"}}>
      <FormsPasswordRecovery
        @validationSchema={{this.validationSchema}}
        @changeset={{this.changeset}}
        @saveFunction={{this.recoverPassword}}
      />
    </LoginLayout>
  </template>
}

export default RouteTemplate(ResetPasswordRouteComponent);
