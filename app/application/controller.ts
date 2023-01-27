import Controller from '@ember/controller';
import { service } from '@ember/service';
import type HeadDataService from 'ember-boilerplate/services/head-data';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

// eslint-disable-next-line ember/no-controllers
export default class Application extends Controller {
  @service declare flashMessages: FlashMessageService;
  @service declare headData: HeadDataService;
}

declare module '@ember/controller' {
  interface Registry {
    application: Application;
  }
}
