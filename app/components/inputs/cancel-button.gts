
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import windowHistoryBack from '@triptyk/ember-utils/utils/window-history-back';
import t from 'ember-intl/helpers/t';

export interface CancelButtonComponentSignature {
  Args: {
    fallbackRoute: string;
  },
  Blocks: {
    default: [];
  },
  Element: HTMLButtonElement;
}

export default class CancelButtonComponent extends Component<CancelButtonComponentSignature> {
  @service declare router: RouterService;

  @action
  async goBack(e: Event) {
    e.preventDefault();
    if (window.history.length === 2) {
      await this.router.transitionTo(this.args.fallbackRoute);
      return;
    }
    windowHistoryBack();
  }

  <template>
    <button type="button" {{on "click" this.goBack}} ...attributes>
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        {{t "global.cancel"}}
      {{/if}}
    </button>
  </template>
}

