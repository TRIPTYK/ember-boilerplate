import Component from '@glimmer/component';
import { service } from '@ember/service';

import FlashMessage from 'ember-cli-flash/components/flash-message';
// @ts-expect-error no types
import HeadLayout from 'ember-cli-head/components/head-layout';
import RouteTemplate from 'ember-route-template';

import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type { RouteTemplateSignature } from 'ember-boilerplate/utils/route-template';
import type ApplicationRoute from 'ember-boilerplate/routes/application';

class ApplicationRouteComponent extends Component<RouteTemplateSignature<ApplicationRoute>> {
  @service declare flashMessages: FlashMessageService;

  flashTypes = (type: 'Success' | 'Warning' | 'Danger') => {
    console.log(type);

    if (type === 'Warning') {
      return 'alert-warning';
    }

    if (type === 'Danger') {
      return 'alert-danger';
    }

    return 'alert-success';
  }

  <template>
    <HeadLayout />
    <div class="fixed z-10 top-4 right-4">
      {{#each this.flashMessages.arrangedQueue as |flash|}}
        <FlashMessage class="mb-2" @flash={{flash}} as |_ flash|>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 shrink-0 stroke-current">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{!-- @glint-expect-error --}}
            <span>{{flash.message}}</span>
        </FlashMessage>
      {{/each}}
    </div>
    {{outlet}}
  </template>
}

export default RouteTemplate(ApplicationRouteComponent);
