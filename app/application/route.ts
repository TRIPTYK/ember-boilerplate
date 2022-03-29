import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import type CurrentUser from 'ember-boilerplate/services/current-user';

export default class Application extends Route {
  @inject declare currentUser: CurrentUser;

  async beforeModel() {
    await this.currentUser.load();
  }
}
