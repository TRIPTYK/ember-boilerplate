import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';

import scrollOnError from 'ember-boilerplate/modifiers/scroll-on-error';
import {
  validateAndMapErrors,
  validateOneAndMapErrors,
} from 'ember-boilerplate/utils/validate-and-map';
import { task } from 'ember-concurrency';
// @ts-expect-error - ember-concurrency does not have types for perform
import perform from 'ember-concurrency/helpers/perform';
import { ImmerChangeset, isChangeset } from 'ember-immer-changeset';
import { Schema } from 'yup';

import type Owner from '@ember/owner';
import type { Promisable } from 'type-fest';

function isFieldError(field: string, errorKey: string): boolean {
  const regex = new RegExp(`^${field.replaceAll('.', '\\.')}($|\\.|\\[)`);

  return regex.test(errorKey);
}

export interface ChangesetFormComponentSignature {
  Args: {
    changeset: ImmerChangeset;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: <T extends ImmerChangeset<any>>(changeset: T) => Promisable<unknown>;
    validationSchema: Schema;
    removeErrorsOnSubmit?: boolean;
    executeOnValid?: boolean;
  };
  Blocks: {
    default: [ChangesetFormComponent['validateAndSubmit']];
  };
  Element: HTMLFormElement;
}

export default class ChangesetFormComponent extends Component<ChangesetFormComponentSignature> {
  public constructor(owner: Owner, args: ChangesetFormComponentSignature['Args']) {
    super(owner, args);
    assert(
      '@changeset is required and must be an ImmerChangeset',
      isChangeset(args.changeset) && args.changeset instanceof ImmerChangeset
    );
    assert('@onSubmit is required', typeof args.onSubmit === 'function');
    assert('@validationSchema is required', args.validationSchema instanceof Schema);

    this.args.changeset.onSet(async (key) => {
      await this.args.changeset.validate(async (draft) => {
        const errors = await validateOneAndMapErrors(key, this.args.validationSchema, draft);

        for (const error of this.args.changeset.errors) {
          if (isFieldError(key, error.key)) {
            this.args.changeset.removeError(error.key);
          }
        }

        for (const error of errors) {
          this.args.changeset.addError(error);
        }
      });
    });
  }

  validateAndSubmit = task(this, { drop: true }, async () => {
    if (this.args.removeErrorsOnSubmit ?? true) {
      this.args.changeset.removeErrors();
    }

    await this.args.changeset.validate(async (dto) => {
      const errors = await validateAndMapErrors(this.args.validationSchema, dto);

      for (const error of errors) {
        this.args.changeset.addError(error);
      }
    });

    if (!this.args.changeset.isValid) {
      return;
    }

    if (this.args.executeOnValid ?? true) {
      this.args.changeset.execute();
    }

    await this.args.onSubmit(this.args.changeset);
  });

  submit = task(this, async (e: Event) => {
    e.preventDefault();
    await this.validateAndSubmit.perform();
  });

  <template>
    <form {{on "submit" (perform this.submit)}} {{scrollOnError @changeset.errors}} ...attributes>
      {{yield this.validateAndSubmit}}
    </form>
  </template>
}
