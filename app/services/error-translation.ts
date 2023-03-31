import Service from '@ember/service';
import { service } from '@ember/service';
import type { Changeset } from 'ember-form-changeset-validations';
import type IntlService from 'ember-intl/services/intl';

interface ErrorDetails {
  field: string;
  message: string;
}

interface Error {
  status: number;
  code: string;
  message: string;
  details: ErrorDetails[];
}

interface TranslatedErrors {
  [key: string]: string[];
}

export default class ErrorTranslationService extends Service {
  @service declare intl: IntlService;

  public translateErrors(errors: Error[]): TranslatedErrors {
    const translatedErrors: TranslatedErrors = {};

    for (const error of errors) {
      for (const errorDetail of error.details) {
        const { field, message } = errorDetail;
        const messagePath = `validations.backend.${message}`;

        if (this.intl.exists(messagePath)) {
          if (!translatedErrors[field]) {
            translatedErrors[field] = [];
          }

          translatedErrors[field]?.push(this.intl.t(messagePath));
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
      changeset.pushErrors(field, errors[field]);
    }
  }
}
