import type { TOC } from '@ember/component/template-only';

export interface LoginLayoutSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const LoginLayout: TOC<LoginLayoutSignature> = <template>
  <div
    class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 h-screen"
    ...attributes
  >
    <h1 class="text-center">
      {{@title}}
    </h1>
    <div class="mx-auto w-full max-w-5xl">
      {{yield}}
    </div>
  </div>
</template>;

export default LoginLayout;
