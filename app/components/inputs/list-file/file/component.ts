import Component from '@glimmer/component';
import type { FileObject } from 'ember-boilerplate/services/base-document';
import { assert } from '@ember/debug';
import type { Owner } from '@ember/test-helpers/build-owner';

interface InputsListFileFileComponentArgs {
  document: FileObject;
  disabled?: boolean;
  onDownload?: (document: FileObject) => unknown;
  onRemove?: (document: FileObject) => unknown;
}

export default class InputsListFileFileComponent extends Component<InputsListFileFileComponentArgs> {
  public constructor(owner: Owner, args: InputsListFileFileComponentArgs) {
    super(owner, args);
    assert('@document is mandatory', args.document !== undefined);
  }

  get isDownloadable() {
    return !this.args.disabled && this.args.document.path;
  }

  get isDeleteable() {
    return !this.args.disabled;
  }
}
