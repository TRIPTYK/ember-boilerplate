import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { service } from '@ember/service';

import type SessionService from './session';
import type Store from '@ember-data/store';
import type UserModel from 'ember-boilerplate/models/user';
import { query } from '@ember-data/json-api/request';
import type { RequestSignature } from '@warp-drive/core-types/symbols';
import type { Collection } from '@ember-data/store/-private/record-arrays/identifier-array';

type QueryUsersRequest = {
  [RequestSignature]?: Collection<UserModel>
}

function buildQueryUsersRequest() {
  return query('user', {}) as QueryUsersRequest;
}

export default class CurrentUserService extends Service {
  @service declare session: SessionService;
  @service declare store: Store;

  @tracked public user: UserModel | null = null;

  async load() {
    if (this.session.isAuthenticated) {
      let user = await this.store.request(
        buildQueryUsersRequest()
      )

      this.user = user.content[0] ?? null;
    }

    return this.user;
  }
}
