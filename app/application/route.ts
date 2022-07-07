import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type CurrentUser from 'ember-boilerplate/services/current-user';

export default class Application extends Route {
  @service declare currentUser: CurrentUser;

  async beforeModel() {
    await this.currentUser.load();
  }
}
