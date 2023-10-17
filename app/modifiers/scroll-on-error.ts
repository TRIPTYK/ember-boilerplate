import { modifier } from 'ember-modifier';

import { scrollToFirstError } from './errors-scroll-up';

import type { ValidationError } from 'ember-immer-changeset';

export default modifier(function scrollOnError(
  element,
  [errors]: [ValidationError[]],
) {
  scrollToFirstError(element, errors);
});
