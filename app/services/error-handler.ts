import Service from '@ember/service';
import { service } from '@ember/service';

import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type { Changeset } from 'ember-immer-changeset';

export interface TranslatedErrors {
  [key: string]: string[];
}

export default class ErrorHandlerService extends Service {
  @service declare flashMessages: FlashMessageService;

  public handle(errors: Error[] | string) {
    this.flashMessages.danger(`${errors}`);
  }
}
