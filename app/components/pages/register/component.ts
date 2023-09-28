import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type IntlService from 'ember-intl/services/intl';
import type RegisterChangesetService from 'ember-boilerplate/services/changesets/register';
import type ErrorHandlerService from 'ember-boilerplate/services/error-handler';

interface PagesRegisterArgs {
  changeset: RegisterChangeset;
}

export default class PagesRegister extends Component<PagesRegisterArgs> {
  @service declare flashMessages: FlashMessageService;
  @service declare intl: IntlService;
  @service('changesets/register') declare register: RegisterChangesetService;
  @service declare errorHandler: ErrorHandlerService;
  @tracked declare changeset: RegisterChangeset;

  constructor(owner: unknown, args: PagesRegisterArgs) {
    super(owner, args);
    this.changeset = new RegisterChangeset({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      gift: 0,
      password: '',
      confirmPassword: '',
    });
  }

  @action
  async saveRegister(changeset: RegisterChangeset) {
    try {
      await this.register.save(changeset);
      this.flashMessages.success(
        this.intl.t('components.pages.register.success_message'),
      );
    } catch (e: unknown) {
      const error = (await e) as AdapterError;
      this.errorHandler.handle(changeset, error.errors);
    }
  }
}
