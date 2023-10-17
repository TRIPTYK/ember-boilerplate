import { service } from '@ember/service';
import JSONAPIAdapter from '@ember-data/adapter/json-api';

import { mergedConfig } from 'ember-boilerplate/utils/get-config';

import config from '../config/environment';

import type SessionService from 'ember-boilerplate/services/session';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service declare session: SessionService;
  @service declare flashMessages: FlashMessageService;

  get host() {
    return mergedConfig.host;
  }
  namespace = config.namespace;

  get headers(): Record<string, string> {
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

  async handleResponse(
    status: number,
    headers: Record<string, unknown>,
    payload: Record<string, unknown>,
    requestData: Record<string, unknown>
  ) {
    if (status === 401 && this.session.isAuthenticated) {
      this.flashMessages.danger(`Unauthorized action`);
      await this.session.invalidate();
    } else {
      if (status > 500) {
        // Internal
        this.flashMessages.danger(`Fatal error : ${payload}`);
      } else if (status > 400) {
        // Bad request
      }
    }

    return super.handleResponse(status, headers, payload, requestData);
  }

  urlForQueryRecord(
    query: Record<string, unknown>,
    modelName: string | number
  ): string {
    const id = query['id'] as string | number;

    delete query['id'];

    return this.buildURL(modelName, id, null, 'findRecord', query);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    application: ApplicationAdapter;
  }
}
