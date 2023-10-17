declare module 'ember-can' {
  export class Ability<T = unknown> {
    model: T;
  }
  export class AbilitiesService {
    can(action: string, model?: unknown): boolean;
  }
}
