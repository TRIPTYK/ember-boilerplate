import Service from '@ember/service';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import { service } from '@ember/service';
import type StoreService from '@ember-data/store';
import type { ChangesetService } from './changeset-service';
import type UserModel from 'ember-boilerplate/models/user';

export default class RegisterChangesetService
  extends Service
  implements ChangesetService<RegisterChangeset>
{
  @service declare store: StoreService;

  async save(changeset: RegisterChangeset): Promise<UserModel> {
    changeset.execute();
    const changesetData = changeset.data;

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

declare module '@ember/service' {
  interface Registry {
    'changesets/register': RegisterChangesetService;
  }
}
