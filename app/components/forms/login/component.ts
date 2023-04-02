import Component from '@glimmer/component';
import type { LoginChangeset } from 'ember-boilerplate/changesets/login';

interface FormsLoginArgs {
  changeset: LoginChangeset;
  saveFunction: (changeset: LoginChangeset) => unknown;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class FormsLogin extends Component<FormsLoginArgs> {}
