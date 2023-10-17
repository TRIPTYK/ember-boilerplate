import { TOC } from "@ember/component/template-only";
import TpkValidationSelect from "@triptyk/ember-input-validation/components/tpk-validation-select";
import InputsErrorValidation from "ember-boilerplate/components/inputs/error-validation";
import changesetGet from 'ember-immer-changeset/helpers/changeset-get';

export interface InputsSelectValidationSignature {
  Args: {
    label: string;
    options: any[];
    multiple: boolean;
    selected: any;
    onChange: (value: any) => void;
    mandatory: boolean;
    changeset: any;
    onSearch: (value: string) => void;
    validationField: string;
    classless: boolean;
    disabled: boolean;
    inputSelectStyle: string;
    defaultText: string;
  },
  Element: HTMLDivElement;
  Blocks: {
    selected: [unknown[] | unknown];
    notSelected: [string];
    option: unknown;
  }
}

const InputsSelectValidationComponent: TOC<InputsSelectValidationSignature> = <template>
  <TpkValidationSelect
  @label={{@label}}
  @options={{@options}}
  @multiple={{@multiple}}
  {{!-- @glint-expect-error --}}
  @selected={{changesetGet @changeset @validationField}}
  @onChange={{@onChange}}
  @changeset={{@changeset}}
  @validationField={{@validationField}}
  @classless={{@classless}}
  class={{if @disabled "disabled"}}
  ...attributes
  as |S|
>
  <div class="flex">
    <S.Label />
    {{#if @mandatory}}
      <span class="pl-1 text-primary">
        *
      </span>
    {{/if}}
  </div>
  {{!-- <S.Searchbar @isOpen={{true}} /> --}}
  <S.Button class={{@inputSelectStyle}} as |selected|>
    {{#if S.hasSelection}}
      {{#if (has-block "selected")}}
        {{#if @multiple}}
          {{#each selected as |s|}}
            {{yield s to="selected"}}
          {{/each}}
        {{else}}
          {{yield selected to="selected"}}
        {{/if}}
      {{/if}}
    {{else}}
      {{#if (has-block "notSelected")}}
        {{yield @defaultText to="notSelected"}}
      {{else}}
        {{@defaultText}}
      {{/if}}
    {{/if}}
  </S.Button>
  <S.Options as |Opts|>
    <Opts as |opt|>
      <div>
        {{#if (has-block "option")}}
          {{yield opt to="option"}}
        {{else}}
          {{opt.option}}
        {{/if}}
      </div>
    </Opts>
  </S.Options>
  <InputsErrorValidation @errors={{S.errors}} />
</TpkValidationSelect>
</template>
