import Service from '@ember/service';
import { getOwner } from '@ember/application';
import fetch from 'fetch';
import type ApplicationInstance from '@ember/application/instance';
import type ApplicationAdapter from 'ember-boilerplate/adapters/application';

export default class FetchService extends Service {
  /**
   * A regular fetch but with the application adapter scope
   * Throws when status code is >= 400
   */
  async request(url: string, moreOptions: Record<string, unknown> = {}) {
    const adapter = (getOwner(this) as ApplicationInstance).lookup(
      'adapter:application'
    ) as ApplicationAdapter;

    const res = await fetch(`${adapter.host}/${adapter.namespace}/${url}`, {
      headers: adapter.headers,
      ...moreOptions,
    });

    if (res.status >= 400) {
      throw res;
    }

    return res;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    fetch: FetchService;
  }
}
