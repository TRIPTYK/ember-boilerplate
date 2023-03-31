import Service from '@ember/service';
import { service } from '@ember/service';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type { Changeset } from 'ember-form-changeset-validations';
import type IntlService from 'ember-intl/services/intl';

export interface TranslatedErrors {
  [key: string]: string[];
}

export default class ErrorTranslationService extends Service {
  @service declare intl: IntlService;
  @service declare flashMessages: FlashMessageService;

  public handleErrors(changeset: Changeset, errors: Error[] | string) {
    if (Array.isArray(errors)) {
      this.generateGlobalErrorMessage(errors);
      const errorsReturned = this.translateErrors(errors);
      this.addErrorTranslatedInChangeset(changeset, errorsReturned);
    } else {
      this.flashMessages.danger(
        `${this.intl.t('validations.backend.global_error')}`
      );
    }
  }

  public translateErrors(errors: Error[]): TranslatedErrors {
    const translatedErrors: TranslatedErrors = {};

    for (const error of errors) {
      for (const errorDetail of error.details) {
        const { field, message } = errorDetail;
        const messagePath = `validations.backend.${message}`;

        if (!translatedErrors[field]) {
          translatedErrors[field] = [];
        }
        if (this.intl.exists(messagePath)) {
          translatedErrors[field]?.push(this.intl.t(messagePath));
        } else {
          translatedErrors[field]?.push(message);
        }
      }
    }

    return translatedErrors;
  }

  public addErrorTranslatedInChangeset(
    changeset: Changeset,
    errors: TranslatedErrors
  ) {
    for (const field in errors) {
      for (const error of errors[field]!) {
        changeset.pushErrors(field, error);
      }
    }
  }

  public generateGlobalErrorMessage(errors: Error[]) {
    for (const error of errors) {
      const messagePath = `validations.backend.${error.code}`;
      if (this.intl.exists(messagePath)) {
        this.flashMessages.danger(
          `${this.intl.t('validations.backend.error')} - ${this.intl.t(
            messagePath
          )}`
        );
      } else {
        this.flashMessages.danger(
          `${this.intl.t('validations.backend.error')} - ${error.code}`
        );
      }
    }
  }
}
