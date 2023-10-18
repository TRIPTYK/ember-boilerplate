import { module, test } from 'qunit';

import { setupTest } from 'ember-boilerplate/tests/helpers';

module('Unit | Route | login', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:login');

    assert.ok(route);
  });
});
