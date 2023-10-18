import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { waitFor } from '@ember/test-waiters';

import { LoginChangeset } from 'ember-boilerplate/changesets/login';
import FormsLogin from 'ember-boilerplate/components/forms/login';
import LoginLayout from 'ember-boilerplate/components/login-layout';
import t from 'ember-boilerplate/helpers/t';
import loginSchema from 'ember-boilerplate/validations/login';
import RouteTemplate from 'ember-route-template';

import type RouterService from '@ember/routing/router-service';
import type CurrentUserService from 'ember-boilerplate/services/current-user';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type SessionService from 'ember-simple-auth/services/session';

interface PagesLoginArgs {}

class PagesLogin extends Component<PagesLoginArgs> {
  @service declare flashMessages: FlashMessageService;
  @service declare currentUser: CurrentUserService;
  @service declare router: RouterService;
  @service declare session: SessionService;

  validationSchema = loginSchema;

  @tracked changeset: LoginChangeset;

  public constructor(owner: unknown, args: PagesLoginArgs) {
    super(owner, args);
    this.changeset = new LoginChangeset({
      email: '',
      password: '',
    });
  }

  @action
  @waitFor
  async login(changeset: LoginChangeset) {
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
  }

  <template>
    <LoginLayout @title={{t "components.pages.login.title"}}>
      <FormsLogin
        @validationSchema={{this.validationSchema}}
        @changeset={{this.changeset}}
        @saveFunction={{this.login}}
      />
    </LoginLayout>
  </template>
}

export default RouteTemplate(PagesLogin);
