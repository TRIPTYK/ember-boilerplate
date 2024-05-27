import Service from '@ember/service';
import { service } from '@ember/service';

import type { ChangesetService } from './changeset-service';
import type StoreService from '@ember-data/store';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import type UserModel from 'ember-boilerplate/models/user';
import { createRecord } from '@ember-data/json-api/request';

export default class RegisterChangesetService
  extends Service
  implements ChangesetService<RegisterChangeset>
{
  @service declare store: StoreService;

  async save(changeset: RegisterChangeset): Promise<UserModel> {
    changeset.execute();

    const changesetData = changeset.data;

    const user = this.store.createRecord<UserModel>('user', {
      lastName: changesetData.lastName,
      firstName: changesetData.firstName,
      phone: changesetData.phone,
      email: changesetData.email,
      password: changesetData.password,
      role: 'user',
    });

    await this.store.request(createRecord(user))

    return user;
  }
}
