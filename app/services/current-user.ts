import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { service } from '@ember/service';

import type SessionService from './session';
import type RequestManager from '@ember-data/request';
import type UserService from './user';
import type UserModel from 'ember-boilerplate/models/user';

export default class CurrentUserService extends Service {
  @service declare session: SessionService;
  @service declare requestManager: RequestManager;
  @service('user') declare userService: UserService;

  @tracked public user: UserModel | null = null;

  async load() {
    if (this.session.isAuthenticated) {
      let userResponse = await this.userService.getProfile();

      if (userResponse.isErr) {
        return null;
      }

      this.user = userResponse.value;
    }

    return this.user;
  }
}
