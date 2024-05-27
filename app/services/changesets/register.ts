import Service from '@ember/service';
import { service } from '@ember/service';

import type { ChangesetService } from './changeset-service';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import { Result } from 'true-myth/result';
import type UserService from '../user';
import type Store from '@ember-data/store';
import type UserModel from 'ember-boilerplate/models/user';

export default class RegisterChangesetService
  extends Service
  implements ChangesetService<RegisterChangeset>
{
  @service declare user: UserService;
  @service declare store: Store;

  async save(changeset: RegisterChangeset): Promise<Result<UserModel ,Error>> {
    changeset.execute();

    const changesetData = changeset.data;

    let response = await this.user.createUser(this.store.createRecord('user', changesetData));

    if (response.isErr) {
      changeset.unexecute();
      return response;
    }

    changeset.save();

    return response;
  }
}
