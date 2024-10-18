import Store from 'ember-data/store';
import { service } from '@ember/service';

export default class AppStore extends Store {
  @service requestManager;
}
