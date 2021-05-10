import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import config from '../../config/environment';

export default class Application extends JSONAPIAdapter {
  @service session!: any;
  @service flashMessages!: any;

  host = config.host;
  namespace = config.namespace;

  get headers() {
    const headers = {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: '',
    };
    if (this.session.isAuthenticated) {
      headers[
        'Authorization'
      ] = `Bearer ${this.session.data.authenticated.accessToken}`;
    }
    return headers;
  }

  handleResponse(status: number, headers: any, payload: any, requestData: any) {
    if (status === 401 && this.session.isAuthenticated) {
      this.session.invalidate();
    } else {
      if (status > 400) {
        // 400 is validation error
      }
    }
    return super.handleResponse(status, headers, payload, requestData);
  }

  urlForQueryRecord(query: Record<string, any>, modelName: string) {
    const id = query.id;
    delete query.id;
    return this.buildURL(modelName, id, null, 'findRecord', query);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    application: Application;
  }
}
