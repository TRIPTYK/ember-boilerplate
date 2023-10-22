import Component from '@glimmer/component';

import TpkValidationSelect from '@triptyk/ember-input-validation/components/tpk-validation-select';
import InputsErrorValidation from 'ember-boilerplate/components/inputs/error-validation';
import changesetGet from 'ember-immer-changeset/helpers/changeset-get';

import type { ImmerChangeset } from 'ember-immer-changeset';

export interface InputsSelectValidationSignature {
  Args: {
    label: string;
    options: unknown[];
    multiple: boolean;
    selected: unknown;
    onChange: (value: unknown) => void;
    mandatory: boolean;
    changeset: ImmerChangeset;
    onSearch: (value: string) => void;
    validationField: string;
    classless: boolean;
    disabled: boolean;
    inputSelectStyle: string;
    defaultText: string;
  };
  Element: HTMLDivElement;
  Blocks: {
    selected: [unknown[] | unknown];
    notSelected: [string];
    option: unknown;
  };
}

export default class InputsSelectValidationComponent extends Component<InputsSelectValidationSignature> {
  isArray = (value: unknown): value is unknown[] => {
    return Array.isArray(value);
  };
  toString = (value: unknown): string => {
    return String(value ?? '');
  };

  <template>
    <TpkValidationSelect
      @label={{@label}}
      @options={{@options}}
      @multiple={{@multiple}}
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
      <S.Button class={{@inputSelectStyle}} as |selected|>
        {{#if S.hasSelection}}
          {{#if (has-block "selected")}}
            {{#if @multiple}}
              {{! safe-guard }}
              {{#if (this.isArray selected)}}
                {{#each selected as |s|}}
                  {{yield s to="selected"}}
                {{/each}}
              {{/if}}
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
              {{this.toString opt.option}}
            {{/if}}
          </div>
        </Opts>
      </S.Options>
      <InputsErrorValidation @errors={{S.errors}} />
    </TpkValidationSelect>
  </template>
}
