import Service from '@ember/service';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import { service } from '@ember/service';
import type StoreService from '@ember-data/store';
import type { ChangesetService } from './changeset-service';
import type { ProxyWrappedChangeset } from 'ember-form-changeset-validations';
import { data } from 'ember-form-changeset-validations';
import type UserModel from 'ember-boilerplate/models/user';

export default class RegisterChangesetService
  extends Service
  implements ChangesetService<RegisterChangeset>
{
  @service declare store: StoreService;

  async save(
    changeset: ProxyWrappedChangeset<RegisterChangeset>
  ): Promise<UserModel> {
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

    await user.save();

    return user;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    register: RegisterChangesetService;
  }
}
