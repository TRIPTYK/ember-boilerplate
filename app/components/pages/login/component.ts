import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { inject } from '@ember/service';
import Component from '@glimmer/component';
import type { FormsLoginDTO } from 'ember-boilerplate/components/forms/login/component';
import type CurrentUser from 'ember-boilerplate/services/current-user';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import type SessionService from 'ember-simple-auth/services/session';
import { loading } from 'ember-loading';
import { tracked } from '@glimmer/tracking';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import LoginValidation from '../../../validator/forms/login';

interface PagesLoginArgs {
  model?: unknown;
}

export default class PagesLogin extends Component<PagesLoginArgs> {
  @inject declare flashMessages: FlashMessageService;
  @inject declare currentUser: CurrentUser;
  @inject declare router: RouterService;
  @inject declare session: SessionService;

  @tracked changeset: TypedBufferedChangeset<FormsLoginDTO>;

  constructor(owner: unknown, args: PagesLoginArgs) {
    super(owner, args);
    this.changeset = Changeset(
      {
        email: '',
        password: '',
      },
      lookupValidator(LoginValidation),
      LoginValidation
    ) as TypedBufferedChangeset<FormsLoginDTO>;
  }

  @action
  @loading
  async login(changeset: TypedBufferedChangeset<FormsLoginDTO>) {
    try {
      await this.session.authenticate('authenticator:jwt', {
        email: changeset.get('email'),
        password: changeset.get('password'),
      });
      await this.currentUser.load();
      this.router.transitionTo('index');
    } catch (e) {
      console.log(e);
      this.flashMessages.danger('Username or password incorrect');
    }
  }
}
