import { action } from '@ember/object';
import Component from '@glimmer/component';

interface Pages404Args {
  model?: unknown;
}

export default class Pages404 extends Component<Pages404Args> {
  @action
  comeback() {
    window.history.back();
  }
}
