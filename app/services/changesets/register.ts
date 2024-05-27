import Service from '@ember/service';
import { service } from '@ember/service';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import { Result, type Err } from 'true-myth/result';
import type Store from '@ember-data/store';
import type UserModel from 'ember-boilerplate/models/user';
import type SafeStore from '../safe-store';
import { createRecord } from '@ember-data/json-api/request';
import type { Document } from '@ember-data/store/-private/document';

export default class RegisterChangesetService
  extends Service
{
  @service declare safeStore: SafeStore;
  @service declare store: Store;

  async save(changeset: RegisterChangeset): Promise<Result<UserModel ,Error>> {
    changeset.execute();

    const changesetData = changeset.data;

    let user = this.store.createRecord<UserModel>('user', {
      ...changesetData,
    });

    let response = await this.safeStore.request<Document<UserModel>>(createRecord(user) as never);

    if (response.isErr) {
      changeset.unexecute();
      for (const iterator of response.error.errors) {
        changeset.addError({
          key: iterator.source.pointer,
          message: iterator.detail,
          value: changeset.get(iterator.source.pointer.split('/')[1]),
          originalValue: changeset.get(iterator.source.pointer.split('/')[1]),
        })
      }
      return response as Err<never, AggregateError>;
    }

    await changeset.save();

    return response.map((user) => user.content.data!);
  }
}
