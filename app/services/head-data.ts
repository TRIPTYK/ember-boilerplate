import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HeadDataService extends Service {
  @tracked title = 'Ember boilerplate';
  @tracked description = 'The ember boilerplate';
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    'head-data': HeadDataService;
  }
}
