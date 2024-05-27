import Service from '@ember/service';
import { service } from '@ember/service';

import type { ChangesetService } from './changeset-service';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import type RequestManager from '../request-manager';
import { post } from 'ember-boilerplate/builders/post';
import { Result, err, map, ok } from 'true-myth/result';
import User from 'ember-boilerplate/schemas/user';

export default class RegisterChangesetService
  extends Service
  implements ChangesetService<RegisterChangeset>
{
  @service declare requestManager: RequestManager;

  async save(changeset: RegisterChangeset): Promise<Result<User ,Error>> {
    changeset.execute();

    const changesetData = changeset.data;

    let response = await this.requestManager.request(
      post('user', changesetData)
    );

    if (!response.response?.ok) {
      changeset.unexecute();
      return err(new Error(response.content as string));
    }

    changeset.save();

    const user = await User.from((response.content as any).data);

    return user.mapErr((e) => new Error(e.errors.join(', ')));
  }
}
