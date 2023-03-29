import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import type ApplicationInstance from '@ember/application/instance';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import type ApplicationAdapter from 'ember-boilerplate/adapters/application';
import type DownloadFileService from '@triptyk/ember-utils/services/download-file';

interface UiListFileArgs {
  documents: unknown[];
}

export default class UiListFile extends Component<UiListFileArgs> {
  @service declare downloadFile: DownloadFileService;
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
  async handleDownloadFile(file: { path: string; filename: string }) {
    await this.downloadFile.downloadFile(file, {});
  }
}
