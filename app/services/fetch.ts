import Service from '@ember/service';
import { getOwner } from '@ember/application';

export type RequestTypes = 'GET' | 'POST' | 'DELETE' | 'PATCH';
export type ResponseType = 'JSON' | 'TEXT' | 'BLOB' | 'RAW';

export default class Fetch extends Service {
  async request(
    url: string,
    method: RequestTypes = 'GET',
    responseType: ResponseType = 'JSON',
    data: any = undefined
  ) {
    const adapter = getOwner(this).lookup('adapter:application');

    return fetch(`${adapter.host}/${adapter.namespace}/${url}`, {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: adapter.headers,
    }).then((res) => {
      switch (responseType) {
        case 'RAW':
          return res;
        case 'BLOB':
          return res.blob();
        case 'JSON':
          return res.json();
        case 'TEXT':
          return res.text();
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
