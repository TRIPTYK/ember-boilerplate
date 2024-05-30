import { registerDestructor } from '@ember/destroyable';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import TpkValidationCheckboxComponent from '@triptyk/ember-input-validation/components/tpk-validation-checkbox';
import TpkValidationDatepickerComponent from '@triptyk/ember-input-validation/components/tpk-validation-datepicker';
import TpkValidationFileComponent from '@triptyk/ember-input-validation/components/tpk-validation-file';
import type TpkFormService from '@triptyk/ember-input-validation/services/tpk-form';
import InputsValidationComponent from 'ember-boilerplate/components/inputs/input-validation';
import config from 'ember-boilerplate/config/environment';

import { usersHandlers } from 'ember-boilerplate/handlers/users';

import type CurrentUserService from 'ember-boilerplate/services/current-user';
import type { IntlService } from 'ember-intl';
import type SessionService from 'ember-simple-auth/services/session';


export default class Application extends Route {
  @service declare session: SessionService;
  @service declare currentUser: CurrentUserService;
  @service declare intl: IntlService;
  @service declare tpkForm: TpkFormService;

  async beforeModel() {

    this.tpkForm.TpkInput = InputsValidationComponent as never;

    await this.setupMSWForDevelopment();
    this.intl.setLocale(['fr-fr']);
    await this.session.setup();
    await this.currentUser.load();
  }

  private async setupMSWForDevelopment() {
    if (config.environment === 'development') {
      await setupMSW(this);
    }
  }
}

async function setupMSW(context: object) {
  // @ts-expect-error rewritten
  let { default: setupServer } = await import('/setup-worker.js');

  const server = setupServer(usersHandlers);

  await server.start();

  registerDestructor(context, () => server.stop());
}
