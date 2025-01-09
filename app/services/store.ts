import Store from 'ember-data/store';
import { service } from '@ember/service';
import type requestManager from './request-manager';

export default class AppStore extends Store {
  @service declare requestManager: requestManager;
}
