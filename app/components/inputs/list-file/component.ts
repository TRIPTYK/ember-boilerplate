import { getOwner } from '@ember/application';
import type ApplicationInstance from '@ember/application/instance';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import type ApplicationAdapter from 'frontend/adapters/application';
import type { FileDTO } from 'frontend/services/base-document';
import { downloadFile } from 'frontend/utils/download-file';

interface UiListFileArgs {
  documents: unknown[];
}

export default class UiListFile extends Component<UiListFileArgs> {
  adapter = (getOwner(this) as ApplicationInstance).lookup(
    'adapter:application'
  ) as ApplicationAdapter;

  get documents() {
    if (Array.isArray(this.args.documents)) {
      return this.args.documents;
    }
    if (this.args.documents) {
      return [this.args.documents];
    }
    return undefined;
  }

  @action
  async downloadFile(file: FileDTO) {
    await downloadFile(this, file);
  }
}
