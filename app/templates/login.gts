import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { service } from '@ember/service';
import { waitFor } from '@ember/test-waiters';

import { LoginChangeset } from 'ember-boilerplate/changesets/login';
import FormsLogin from 'ember-boilerplate/components/forms/login';
import LoginLayout from 'ember-boilerplate/components/login-layout';
import loginSchema from 'ember-boilerplate/validations/login';
import t from 'ember-intl/helpers/t';
import RouteTemplate from 'ember-route-template';

import type RouterService from '@ember/routing/router-service';
import type CurrentUserService from 'ember-boilerplate/services/current-user';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type SessionService from 'ember-simple-auth/services/session';
import type { RouteTemplateSignature } from 'ember-boilerplate/utils/route-template';
import type LoginRoute from 'ember-boilerplate/routes/login';

class PagesLogin extends Component<RouteTemplateSignature<LoginRoute>> {
  @service declare flashMessages: FlashMessageService;
  @service declare currentUser: CurrentUserService;
  @service declare router: RouterService;
  @service declare session: SessionService;

  validationSchema = loginSchema;

  @tracked changeset: LoginChangeset;

  public constructor(owner: unknown, args: RouteTemplateSignature<LoginRoute>['Args']) {
    super(owner, args);
    this.changeset = new LoginChangeset({
      email: '',
      password: '',
    });
  }

  login = waitFor(async (changeset: LoginChangeset) => {
    try {
      await this.session.authenticate('authenticator:jwt', {
        email: changeset.get('email'),
        password: changeset.get('password'),
      });
      await this.currentUser.load();
      await this.router.transitionTo('index');
    } catch (e) {
      this.flashMessages.danger('Username or password incorrect');
    }
  });

  <template>
    <LoginLayout @title={{t "components.templates.login.title"}}>
      <FormsLogin
        @validationSchema={{this.validationSchema}}
        @changeset={{this.changeset}}
        @saveFunction={{this.login}}
      />
    </LoginLayout>
  </template>
}

export default RouteTemplate(PagesLogin);
