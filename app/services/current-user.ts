import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { service } from '@ember/service';

import type SessionService from './session';
import type Store from '@ember-data/store';
import type FetchService from '@triptyk/ember-utils/services/fetch';
import type UserModel from 'ember-boilerplate/models/user';

export default class CurrentUserService extends Service {
  @service declare session: SessionService;
  @service declare store: Store;
  @service declare fetch: FetchService;

  @tracked public user?: UserModel;

  async load() {
    if (this.session.isAuthenticated) {
      let user = await this.store.queryRecord('user', { profile: true });

      this.user = user;
    }

    return this.user;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'current-user': CurrentUserService;
  }
}
