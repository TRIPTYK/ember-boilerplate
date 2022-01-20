import Service from '@ember/service';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Store from '@ember-data/store';
import Fetch from './fetch';
import UserModel from 'ember-boilerplate/models/user';
import Session from './session';

export default class CurrentUser extends Service {
  @inject declare session: Session;
  @inject declare store: Store;
  @inject declare fetch: Fetch;

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
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    'current-user': CurrentUser;
  }
}
