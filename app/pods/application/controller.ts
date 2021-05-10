import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import FlashMessageService from 'ember-cli-flash/services/flash-messages';

export default class Application extends Controller {
  @inject session!: any;
  @inject flashMessages!: FlashMessageService;

  @action
  logout() {
    this.session.invalidate();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    application: Application;
  }
}
