
import DS from 'ember-data';
import { inject as service } from '@ember/service';
import config from '../../config/environment';
import { computed } from '@ember/object';

export default class Application extends DS.JSONAPIAdapter.extend({
  // anything which *must* be merged on the prototype
}) {
  @service session!: any;
  @service flashMessages!: any;

  host = config.host;
  namespace = config.namespace;

  @computed('session.{data.authenticated.accessToken,isAuthenticated}')
  get headers() {
    const headers = {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization':''
    };
    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.accessToken}`;
    }
    return headers;
  }

  handleResponse(status: number, headers:any, payload:any, requestData:any) {
    if (status === 401 && this.get('session.isAuthenticated')) {
      this.session.invalidate();
    }else{
      if (status > 400) { // 400 is validation error
        
      }
    }
    return super.handleResponse(status,headers,payload,requestData);
  }

  // @ts-ignore
  urlForQueryRecord(query: ObjectLiteral,modelName: string) {
    const id = query.id;
    delete query.id;
    return this.buildURL(modelName, id, null, "findRecord", query);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    'application': Application;
  }
}
