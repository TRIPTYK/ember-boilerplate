import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type CurrentUserService from 'ember-boilerplate/services/current-user';
import type SessionService from 'ember-simple-auth/services/session';

export default class Application extends Route {
  @service declare session: SessionService;
  @service declare currentUser: CurrentUserService;

  async beforeModel() {
    await this.session.setup();
    await this.currentUser.load();
  }
}
