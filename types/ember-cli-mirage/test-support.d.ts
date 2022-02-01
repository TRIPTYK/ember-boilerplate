import type { TestContext } from '@ember/test-helpers';

declare module 'ember-cli-mirage/test-support' {
  declare function setupMirage(hooks: unknown);
  declare interface MirageTestContext extends TestContext {
    server: {
      createList: Function;
    };
  }
}
