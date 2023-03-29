import Component from '@glimmer/component';
import type { BufferedChangeset } from 'ember-changeset/types';
import { restartableTask } from 'ember-concurrency';

export interface SelectSearchComponentArgs {
  onSearch?: (searchValue: string) => void;
  changeset?: BufferedChangeset;
  validationField?: string;
}

export default class SelectSearchComponent extends Component<SelectSearchComponentArgs> {
  get errors() {
    if (!this.args.changeset || !this.args.validationField) {
      return [];
    }
    return (
      (this.args.changeset.errors.filter(
        (err) => err.key === this.args.validationField
      ) as unknown[]) ?? []
    );
  }

  get hasError() {
    return this.errors.length > 0;
  }

  @restartableTask
  *search(value: string) {
    yield this.args.onSearch?.(value);
  }
}
