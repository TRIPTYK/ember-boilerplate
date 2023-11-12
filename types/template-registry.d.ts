import '@glint/environment-ember-loose';
import '@glint/environment-template-components';

import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type EmberInputRegistry from '@triptyk/ember-input/template-registry';
import type EmberInputValidationRegistry from '@triptyk/ember-input-validation/template-registry';
import type FormsLogin from 'ember-boilerplate/components/forms/login';
import type FormsRegister from 'ember-boilerplate/components/forms/register';
import type EmberIntlRegistry from 'ember-intl/template-registry';
import type EmberTruthHelpersRegistry from 'ember-truth-helpers/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends RenderModifiersRegistry,
      EmberInputRegistry,
      EmberInputValidationRegistry,
      EmberTruthHelpersRegistry,
      EmberIntlRegistry {
        // Used for tests only
        FormsRegister: typeof FormsRegister;
        'Forms::Register': typeof FormsRegister;
        FormsLogin: typeof FormsLogin;
        'Forms::Login': typeof FormsLogin;
      }
}
