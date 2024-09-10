import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { service } from '@ember/service';

import type SessionService from './session';
import type RequestManager from '@ember-data/request';
import type UserModel from 'ember-boilerplate/models/user';
import type SafeStore from './safe-store';
import { findRecord } from '@ember-data/json-api/request';
import { Maybe } from 'true-myth';

export default class CurrentUserService extends Service {
  @service declare session: SessionService;
  @service declare requestManager: RequestManager;
  @service declare safeStore: SafeStore;

  @tracked public user: Maybe<UserModel> = Maybe.nothing();

  async load() {
    if (this.session.isAuthenticated) {
      let userResponse = await this.safeStore.request(findRecord<UserModel>('user', 'profile'))

      if (userResponse.isErr) {
        return null;
      }

      this.user = Maybe.just(userResponse.value.content.data);
    }

    return this.user;
  }
}
