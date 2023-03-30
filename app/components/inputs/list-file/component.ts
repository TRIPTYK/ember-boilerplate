import Component from '@glimmer/component';
import type { FileObject } from 'ember-boilerplate/services/base-document';

interface UiListFileArgs {
  documents: FileObject[] | FileObject;
  downloadEnabled: boolean;
  disabled?: boolean;
}

export default class UiListFile extends Component<UiListFileArgs> {
  get documents() {
    if (Array.isArray(this.args.documents)) {
      return this.args.documents;
    }
    return [this.args.documents];
  }
}
