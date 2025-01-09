import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import t from 'ember-intl/helpers/t';
import RouteTemplate from 'ember-route-template';
import type { RouteTemplateSignature } from 'ember-boilerplate/utils/route-template';
import type NotFoundRoute from 'ember-boilerplate/routes/404';

export interface NotFoundRouteComponentSignature {}

class NotFoundRouteComponent extends Component<RouteTemplateSignature<NotFoundRoute>> {
  comeback = () => {
    window.history.back();
  };

  <template>
    <div class="flex justify-center items-center h-screen w-full" data-test-page="404">
      <div class="pl-2">
        <h1 class="text-7xl font-semibold text-primary">
          {{t "global.oops"}}!
        </h1>
        <p class="text-2xl mt-8">
          {{t "global.sorryNotFound"}}
        </p>
        <button data-test-btn-back type="button" class="mt-12 btn" {{on "click" this.comeback}}>
          {{t "components.templates.404.back"}}
        </button>
      </div>
    </div>
  </template>
}

export default RouteTemplate(NotFoundRouteComponent);
