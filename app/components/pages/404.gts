import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import t from 'ember-intl/helpers/t';

interface Pages404Args {}

export default class Pages404 extends Component<Pages404Args> {
  @action
  comeback() {
    window.history.back();
  }

  <template>
    <div data-test-page="404" class="mt-36 flex flex-col items-center mb-20">
    <img class="w-1/2" src="/assets/images/page-404.svg" alt="" />
    <h1 class="text-5xl font-semibold">
      {{t "components.pages.404.title"}}
    </h1>
    <p class="text-xl mt-5">
      {{t "components.pages.404.content"}}
    </p>
    <button
      data-test-btn-back
      type="button"
      class="mt-12 bg-primary py-2 px-4 rounded-lg font-xl font-extralight text-black"
      {{on "click" this.comeback}}
    >
      {{t "components.pages.404.back"}}
    </button>
  </div>
  </template>
}
