import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { service } from '@ember/service';

import type SessionService from './session';
import type RequestManager from '@ember-data/request';
import { query } from 'ember-boilerplate/builders/query';
import User from 'ember-boilerplate/schemas/user';

export default class CurrentUserService extends Service {
  @service declare session: SessionService;
  @service declare requestManager: RequestManager;
  @tracked public user: User | null = null;

  async load() {
    if (this.session.isAuthenticated) {
      let userResponse = await this.requestManager.request(query('user'));
      const user = await User.from(userResponse.content);

      if (user.isErr) {
        return null;
      }

      this.user = user.value;
    }

    return this.user;
  }
}
