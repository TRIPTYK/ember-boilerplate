import Controller from '@ember/controller';
import { inject } from '@ember/service';
import FlashMessageService from 'ember-cli-flash/services/flash-messages';

// eslint-disable-next-line ember/no-controllers
export default class Application extends Controller {
  @inject declare flashMessages: FlashMessageService;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    application: Application;
  }
}
