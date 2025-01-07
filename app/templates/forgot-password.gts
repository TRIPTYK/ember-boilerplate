import Component from '@glimmer/component';

import { service } from '@ember/service';

import { ForgotPasswordChangeset } from 'ember-boilerplate/changesets/forgot-password';
import FormsForgotPassword from 'ember-boilerplate/components/forms/forgot-password';
import LoginLayout from 'ember-boilerplate/components/login-layout';
import forgotPasswordSchema from 'ember-boilerplate/validations/forgot-password';
import RouteTemplate from 'ember-route-template';
import { tracked } from 'tracked-built-ins';

import type Router from '@ember/routing/router';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import RequestManager from '@ember-data/request';
import type ForgotPasswordRoute from 'ember-boilerplate/routes/forgot-password';
import type { RouteTemplateSignature } from 'ember-boilerplate/utils/route-template';

class PagesForgotPassword extends Component<RouteTemplateSignature<ForgotPasswordRoute>> {
  @service declare router: Router;
  @service declare requestManager: RequestManager;
  @service declare flashMessages: FlashMessageService;
  @tracked changeset: ForgotPasswordChangeset;

  validationSchema = forgotPasswordSchema;

  constructor(owner: unknown, args: RouteTemplateSignature<ForgotPasswordRoute>['Args']) {
    super(owner, args);
    this.changeset = new ForgotPasswordChangeset({
      email: '',
    });
  }

  sendRecoveryRequest = async (changeset: ForgotPasswordChangeset) => {
    try {
      await this.requestManager.request({
        url: '/auth/forgot-password',
        body: JSON.stringify({
          email: changeset.get('email'),
        }),
        method: 'POST',
      });
      this.flashMessages.success('global.successForgotPassword');
    } catch (e) {
      this.flashMessages.danger('global.incorrectEmail');
    }
  }

  <template>
    <LoginLayout @title="Mot de passe oublié">
      <FormsForgotPassword
        @validationSchema={{this.validationSchema}}
        @changeset={{this.changeset}}
        @saveFunction={{this.sendRecoveryRequest}}
      />
    </LoginLayout>
  </template>
}

export default RouteTemplate(PagesForgotPassword);
