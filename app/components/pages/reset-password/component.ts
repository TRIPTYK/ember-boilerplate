import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { service } from '@ember/service';
import type FetchService from '@triptyk/ember-utils/services/fetch';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { ResetPasswordChangeset } from 'ember-boilerplate/changesets/reset-password';
import { createChangeset } from 'ember-form-changeset-validations';
import passwordRecoveryValidation from 'ember-boilerplate/validations/reset-password';

interface PagesResetPasswordArgs {
  token: string;
}

export default class PagesResetPassword extends Component<PagesResetPasswordArgs> {
  @service declare fetch: FetchService;
  @service declare router: RouterService;
  @service declare flashMessages: FlashMessageService;
  @tracked changeset: ResetPasswordChangeset;

  constructor(owner: unknown, args: PagesResetPasswordArgs) {
    super(owner, args);
    this.changeset = createChangeset(
      ResetPasswordChangeset,
      {
        password: '',
        confirmPassword: '',
      },
      passwordRecoveryValidation
    );
  }

  @action
  async recoverPassword(changeset: ResetPasswordChangeset) {
    try {
      await this.fetch.request(`auth/set-password/${this.args.token}`, {
        body: JSON.stringify({
          password: changeset.get('password'),
        }),
        method: 'POST',
      });
      this.flashMessages.success('Password has been reset.');
      this.router.transitionTo('login');
    } catch (e) {
      this.flashMessages.danger('An error occured');
    }
  }
}
