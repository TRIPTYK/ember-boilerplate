import '@glint/environment-ember-loose';
import '@glint/environment-template-components';
import '@triptyk/ember-input/modifiers/focus-trap';
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type EmberIntlRegistry from 'ember-intl/template-registry';
import type EmberInputValidationRegistry from '@triptyk/ember-input-validation/template-registry';
import type EmberInputRegistry from '@triptyk/ember-input/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends RenderModifiersRegistry,
      EmberInputRegistry,
      EmberInputValidationRegistry,
      EmberIntlRegistry {}
}
