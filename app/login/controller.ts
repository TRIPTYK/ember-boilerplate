import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject } from '@ember/service';
import { FormsLoginDTO } from 'ember-boilerplate/components/forms/login/component';
import CurrentUser from 'ember-boilerplate/services/current-user';
import FlashMessageService from 'ember-cli-flash/services/flash-messages';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import SessionService from 'ember-simple-auth/services/session';

export default class Login extends Controller {
  @inject declare flashMessages: FlashMessageService;
  @inject declare currentUser: CurrentUser;
  @inject declare router: RouterService;
  @inject declare session: SessionService;

  @action
  async saveFunction(changeset: TypedBufferedChangeset<FormsLoginDTO>) {
    try {
      await this.session.authenticate('authenticator:jwt', {
        email: changeset.get('email'),
        password: changeset.get('password'),
      });
      await this.currentUser.load();
      this.router.transitionTo('index');
    } catch (e) {
      this.flashMessages.danger('Username or password incorrect');
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    login: Login;
  }
}
