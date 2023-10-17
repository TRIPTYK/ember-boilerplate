import { TOC } from "@ember/component/template-only";
import { ImmerChangeset } from "ember-immer-changeset";
import { Schema } from "yup";
import { InputsValidationComponent } from 'ember-boilerplate/components/inputs/input-validation';
import YupForm from "./yup-form";
import t from "ember-intl/helpers/t";

export interface FormsPasswordRecoveryComponentSignature {
  Args: {
    saveFunction: (changeset: any) => void;
    changeset: ImmerChangeset;
    validationSchema: Schema;
  },
  Element: HTMLFormElement;
}

const FormsPasswordRecovery: TOC<FormsPasswordRecoveryComponentSignature> =
<template>
  <YupForm
    class="px-4 py-8 mt-8 bg-white rounded-lg shadow space-y-6 sm:px-10 sm:mx-auto sm:w-full sm:max-w-md"
    @onSubmit={{@saveFunction}}
    @changeset={{@changeset}}
    @validationSchema={{@validationSchema}}
    ...attributes
  >
    <InputsValidationComponent
      class="input_block"
      @label={{t "components.forms.reset-password.new_password"}}
      @changeset={{@changeset}}
      @validationField="password"
      data-test-input="password"
    />
    <InputsValidationComponent
      class="input_block"
      @label={{t "components.forms.reset-password.confirm_new_password"}}
      @changeset={{@changeset}}
      @validationField="confirmPassword"
      data-test-input="confirmPassword"
    />
    <button data-test-submit type="submit" class="btn">
      <span>
        {{t "components.forms.reset-password.validate"}}
      </span>
    </button>
  </YupForm>
</template>

export default FormsPasswordRecovery;
