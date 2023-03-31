import { action } from '@ember/object';
import { service } from '@ember/service';
import type StoreService from '@ember-data/store';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import formsRegisterValidation from 'ember-boilerplate/validations/register';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import { waitFor } from '@ember/test-waiters';
import type { ProxyWrappedChangeset } from 'ember-form-changeset-validations';
import { createChangeset, data } from 'ember-form-changeset-validations';
import type IntlService from 'ember-intl/services/intl';

interface PagesRegisterArgs {
  changeset: RegisterChangeset;
}

export default class PagesRegister extends Component<PagesRegisterArgs> {
  @service declare flashMessages: FlashMessageService;
  @service declare intl: IntlService;
  @service declare store: StoreService;
  @tracked declare changeset: RegisterChangeset;

  constructor(owner: unknown, args: PagesRegisterArgs) {
    super(owner, args);
    this.changeset = createChangeset(
      RegisterChangeset,
      {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      },
      formsRegisterValidation
    );
  }

  @action
  @waitFor
  async saveRegister(changeset: ProxyWrappedChangeset<RegisterChangeset>) {
    await changeset.save();

    const changesetData = data(changeset);

    const user = this.store.createRecord('user', {
      lastName: changesetData.lastName,
      firstName: changesetData.firstName,
      phone: changesetData.phone,
      email: changesetData.email,
      password: changesetData.password,
      role: 'user',
    });

    try {
      await user.save();
      this.flashMessages.success(
        this.intl.t('components.pages.register.sucessMessage')
      );
    } catch (e) {
      console.log(e);
    }
  }
}
