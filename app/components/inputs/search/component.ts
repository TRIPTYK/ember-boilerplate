import { assert } from '@ember/debug';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';

export interface InputsSearchComponentArgs {
  onChange?: (value: string, e: Event) => unknown;
  onSearch: (value: string, e: Event) => unknown;
}

export default class InputsSearchComponent extends Component<InputsSearchComponentArgs> {
  @tracked searchValue = '';

  constructor(owner: unknown, args: InputsSearchComponentArgs) {
    super(owner, args);
    assert(
      'Please provide @onSearch to search input',
      args.onSearch !== undefined
    );
  }

  @action
  updateSearchValue(v: string) {
    this.searchValue = v;
  }

  @action
  onSearch(e: Event) {
    // prevent to submit form
    e.preventDefault();
    this.args.onSearch(this.searchValue, e);
  }
}
