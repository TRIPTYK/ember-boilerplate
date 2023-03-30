import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import formsRegisterValidation from 'ember-boilerplate/validations/register';
import { createChangeset } from 'ember-form-changeset-validations';

interface PagesRegisterArgs {
  changeset: RegisterChangeset;
}

export default class PagesRegister extends Component<PagesRegisterArgs> {
  @tracked declare changeset: RegisterChangeset;

  constructor(owner: unknown, args: PagesRegisterArgs) {
    super(owner, args);
    this.changeset = createChangeset(
      RegisterChangeset,
      {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
      formsRegisterValidation
    );
  }

  @action
  saveRegister(_changeset: RegisterChangeset) {}
}
