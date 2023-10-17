import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

import config from 'ember-boilerplate/config/environment';

export default class HeadDataService extends Service {
  @tracked title = config.applicationName;
  @tracked description = 'The ember boilerplate';

  get applicationName() {
    return config.applicationName;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    'head-data': HeadDataService;
  }
}
