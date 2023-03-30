import Service from '@ember/service';
import type { RegisterChangeset } from 'ember-boilerplate/changesets/register';
import type { ChangesetService } from './changeset-service';

export default class RegisterChangesetService
  extends Service
  implements ChangesetService<RegisterChangeset>
{
  save(): unknown {
    throw new Error('Not implemented');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    register: RegisterChangesetService;
  }
}
