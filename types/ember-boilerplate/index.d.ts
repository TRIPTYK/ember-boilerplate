import type Route from '@ember/routing/route';
import type ArrayPrototypeExtensions from '@ember/array/types/prototype-extensions';

declare global {
  interface Array<T> extends ArrayPrototypeExtensions<T> {}
  type Resolved<P> = P extends Promise<infer T> ? T : P;
  type ModelFrom<R extends Route> = Resolved<ReturnType<R['model']>>;
}
