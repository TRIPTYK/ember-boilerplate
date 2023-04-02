import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type Store from '@ember-data/store';
import type UserModel from 'ember-boilerplate/models/user';
import type SessionService from './session';
import type FetchService from '@triptyk/ember-utils/services/fetch';

export default class CurrentUserService extends Service {
  @service declare session: SessionService;
  @service declare store: Store;
  @service declare fetch: FetchService;

  @tracked
  public user?: UserModel;

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
