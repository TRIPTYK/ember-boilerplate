import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import Component from '@glimmer/component';
import type CurrentUserService from 'ember-boilerplate/services/current-user';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type SessionService from 'ember-simple-auth/services/session';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';
import { service } from '@ember/service';
import { LoginChangeset } from 'ember-boilerplate/changesets/login';
import loginSchema from 'ember-boilerplate/validations/login';
import LoginLayout from 'ember-boilerplate/components/login-layout';
import FormsLogin from 'ember-boilerplate/components/forms/login';
import t from 'ember-intl/helpers/t';

interface PagesLoginArgs {}

export default class PagesLogin extends Component<PagesLoginArgs> {
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
