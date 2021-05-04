import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import User from '../models/user';
import Store from '@ember-data/store';
import Fetch from './fetch';

export default class CurrentUser extends Service {
  @service session!: any;
  @service store!: Store;
  @service fetch!: Fetch;

  @tracked
  public user: User | null = null;

  async load() {
    if (this.session.isAuthenticated) {
      let user = await this.store.queryRecord('user', { profile: true });
      this.user = user;
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    'current-user': CurrentUser;
  }
}
