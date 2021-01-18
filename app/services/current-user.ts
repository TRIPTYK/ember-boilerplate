import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import User from '../models/user';
import DS from 'ember-data';
import Fetch from './fetch';

export default class CurrentUser extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @service session!: any;
  @service store!: DS.Store;
  @service fetch!: Fetch;

  @tracked
  public user: User | null = null;

  async load() {
    if (this.session.isAuthenticated) {
      let user = await this.store.queryRecord('user', { profile: true });
      this.set('user', user);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'current-user': CurrentUser;
  }
}
