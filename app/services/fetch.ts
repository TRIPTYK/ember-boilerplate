import Service from '@ember/service';
import { getOwner } from '@ember/application';
import fetch from 'fetch';
import ApplicationInstance from '@ember/application/instance';
import ApplicationAdapter from 'ember-boilerplate/adapters/application';

export type RequestTypes = 'GET' | 'POST' | 'DELETE' | 'PATCH';
export type ResponseType = 'JSON' | 'TEXT' | 'BLOB' | 'RAW';

export default class Fetch extends Service {
  async request(
    url: string,
    method: RequestTypes = 'GET',
    responseType: ResponseType,
    moreOptions: Record<string, unknown>
  ) {
    const adapter = (getOwner(this) as ApplicationInstance).lookup(
      'adapter:application'
    ) as ApplicationAdapter;

    return fetch(`${adapter.host}/${adapter.namespace}/${url}`, {
      method,
      headers: adapter.headers,
      ...moreOptions,
    }).then((res) => {
      if (res.status >= 400) {
        throw res;
      }

      switch (responseType) {
        case 'BLOB':
          return res.blob();
        case 'JSON':
          return res.json();
        case 'TEXT':
          return res.text();
        default:
          return res;
      }
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    fetch: Fetch;
  }
}
