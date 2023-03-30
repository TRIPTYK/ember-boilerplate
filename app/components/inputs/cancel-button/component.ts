import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import windowHistoryBack from '@triptyk/ember-utils/utils/window-history-back';

interface CancelButtonComponentArgs {
  fallbackRoute: string;
}

export default class CancelButtonComponent extends Component<CancelButtonComponentArgs> {
  @service declare router: RouterService;

  @action
  goBack(e: Event) {
    e.preventDefault();
    if (window.history.length === 2) {
      this.router.transitionTo(this.args.fallbackRoute);
      return;
    }
    windowHistoryBack();
  }
}
