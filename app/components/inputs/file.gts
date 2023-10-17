import { TOC } from "@ember/component/template-only";
import TpkFile from "@triptyk/ember-input/components/tpk-file";
import InputsFileInputLayout from "ember-boilerplate/components/inputs/file/input-layout";

export interface InputsFileSignature {
  Args: {
    label: string;
    placeholder?: string;
    accept: string;
    multiple: boolean;
    disabled?: boolean;
    inputClass?: string;
    onChange: (files: File[]) => void;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  }
}

const InputsFile: TOC<InputsFileSignature> = <template>
  <TpkFile
  @label={{@label}}
  @accept={{@accept}}
  @onChange={{@onChange}}
  @multiple={{@multiple}}
  class={{if @disabled "disabled"}}
  ...attributes
  as |TI|
>
  <div>
    <TI.Label>
      {{@label}}
    </TI.Label>
    {{#unless @disabled}}
      {{!-- @glint-expect-error --}}
      <InputsFileInputLayout>
        <TI.Input
          placeholder={{@placeholder}}
          disabled={{@disabled}}
          class="{{@inputClass}}
            absolute opacity-0 w-full left-0 top-0 h-full hover:cursor-pointer hover:underline"
        />
      </InputsFileInputLayout>
    {{/unless}}
  </div>
</TpkFile>
</template>

export default InputsFile;
