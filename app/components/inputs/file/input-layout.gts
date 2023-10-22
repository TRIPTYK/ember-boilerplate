import t from 'ember-intl/helpers/t';

import type { TOC } from '@ember/component/template-only';

export interface InputsFileSignature {
  Args: {
    accept: string;
    acceptText: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const InputsFileInputLayout: TOC<InputsFileSignature> = <template>
  <div class="relative flex border-2 border-gray-300 border-dashed rounded-md" ...attributes>
    <div class="w-full text-center position-relative space-y-1">
      <div class="flex items-center justify-center h-32 text-sm text-gray-600 position-relative">
        <label
          class="flex items-center justify-center w-full font-medium text-indigo-600 rounded-md hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          {{yield}}
          <span class="">
            <img
              class="w-12 h-12 mx-auto"
              src="/assets/icons/upload.svg"
              alt={{t "document.upload"}}
            />
            <span class="py-6 text-gray-500 hover:underline">
              {{t "document.uploadFileOfType" what=@acceptText}}
              <br />
              {{t "document.or"}}
              <br />
              {{t "document.dragAndDropOfType" what=@acceptText}}
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>;

export default InputsFileInputLayout;
