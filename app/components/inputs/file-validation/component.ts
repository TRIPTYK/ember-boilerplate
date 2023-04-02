import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';
import type IntlService from 'ember-intl/services/intl';

export interface InputsFileValidationComponentArgs {
  onChange: (...args: unknown[]) => unknown;
  accept: string;
}

export default class InputsFileValidationComponent extends Component<InputsFileValidationComponentArgs> {
  @service declare flashMessages: FlashMessageService;
  @service declare intl: IntlService;
  constructor(owner: unknown, args: InputsFileValidationComponentArgs) {
    super(owner, args);
    assert('@onChange is required', args.onChange !== undefined);
  }

  @action
  onChange(files: File[]) {
    if (this.args.accept) {
      const accepts = this.args.accept.split(',');
      let hasError = false;
      files.forEach((file: File) => {
        if (!accepts.includes(file.type) && !hasError) {
          this.flashMessages.danger(this.intl.t('global.file_error_type'));
          hasError = true;
        }
      });
      if (hasError) return;
    }
    this.args.onChange(files);
  }
}
