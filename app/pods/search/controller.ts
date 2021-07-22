import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import Fetch from 'ember-boilerplate/services/fetch';
import { tracked } from '@glimmer/tracking';

export default class Search extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @inject fetch!: Fetch;
  @tracked query!: string;
  @tracked result!: any;
  @action
  async searchTracks(e: any) {
    e.preventDefault();
    let res = await fetch(
      `https://api.soundcloud.com/tracks?client_id=TBjt0YYjR6NeqDEMaiMXQJSJWw3JjZ0a&q=${this.query}&limit=2`
    );
    res = await res.json();
    this.result = res;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    search: Search;
  }
}
