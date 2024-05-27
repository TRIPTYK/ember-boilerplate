// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import Store from 'ember-data/store';
import { service } from '@ember/service';

export default class AppStore extends Store {
  @service requestManager;
}
