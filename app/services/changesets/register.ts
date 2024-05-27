import Service from '@ember/service';
import { service } from '@ember/service';

import type { ChangesetService } from './changeset-service';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import { Result } from 'true-myth/result';
import User from 'ember-boilerplate/schemas/user';
import type UserService from '../user';

export default class RegisterChangesetService
  extends Service
  implements ChangesetService<RegisterChangeset>
{
  @service declare user: UserService;

  async save(changeset: RegisterChangeset): Promise<Result<User ,Error>> {
    changeset.execute();

    const changesetData = changeset.data;

    let response = await this.user.createUser({
      ...changesetData,
      role: 'admin'
    });

    if (response.isErr) {
      changeset.unexecute();
      return response;
    }

    changeset.save();

    return response;
  }
}
