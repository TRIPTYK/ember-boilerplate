import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import type FetchService from '@triptyk/ember-utils/services/fetch';
import { service } from '@ember/service';
import { action } from '@ember/object';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type IntlService from 'ember-intl/services/intl';
import type Router from '@ember/routing/router';
import { ForgotPasswordChangeset } from 'ember-boilerplate/changesets/forgot-password';

interface PagesForgotPasswordArgs {}

export default class PagesForgotPassword extends Component<PagesForgotPasswordArgs> {
  @service declare fetch: FetchService;
  @service declare router: Router;
  @service declare flashMessages: FlashMessageService;
  @service declare intl: IntlService;
  @tracked changeset: ForgotPasswordChangeset;

  constructor(owner: unknown, args: PagesForgotPasswordArgs) {
    super(owner, args);
    this.changeset = new ForgotPasswordChangeset({
      email: '',
    });
  }

  @action
  async sendRecoveryRequest(changeset: ForgotPasswordChangeset) {
    try {
      await this.fetch.request('auth/forgot-password', {
        body: JSON.stringify({
          email: changeset.get('email'),
        }),
        method: 'POST',
      });
      this.flashMessages.success(this.intl.t('global.successForgotPassword'));
    } catch (e) {
      this.flashMessages.danger(this.intl.t('global.incorrectEmail'));
    }
  }
}
