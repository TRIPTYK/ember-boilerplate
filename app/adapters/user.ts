import JSONAPIAdapter from '../adapters/application';

export default class User extends JSONAPIAdapter {
  urlForQueryRecord(
    query: Record<string, unknown>,
    modelName: string | number
  ) {
    if (query.profile) {
      delete query.profile;
      const url = `${this.host}/${this.namespace}/users/profile`;
      return url;
    } else {
      return super.urlForQueryRecord(query, modelName);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    user: User;
  }
}
