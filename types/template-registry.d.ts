import '@glint/environment-ember-loose';
import '@glint/environment-template-components';

import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type EmberInputRegistry from '@triptyk/ember-input/template-registry';
import type EmberInputValidationRegistry from '@triptyk/ember-input-validation/template-registry';
import type FormsRegister from 'ember-boilerplate/components/forms/register';
import type EmberIntlRegistry from 'ember-intl/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends RenderModifiersRegistry,
      EmberInputRegistry,
      EmberInputValidationRegistry,
      EmberIntlRegistry {
        // Used for tests only
        FormsRegister: typeof FormsRegister;
        'Forms::Register': typeof FormsRegister;
      }
}
