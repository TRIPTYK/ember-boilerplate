import { later } from '@ember/runloop';

import type { ValidationError } from 'ember-immer-changeset';

export function scrollToFirstError(
  element: Element | Document,
  errors: ValidationError[],
): void {
  const firstValidError = errors.find(
    (error) =>
      element.querySelector(`[anchorScrollUp="${error?.key}"]`) !== null,
  );

  if (firstValidError) {
    const errorElement = document.querySelector(
      `[anchorScrollUp="${firstValidError?.key}"]`,
    ) as HTMLElement;

    errorElement.style.transition = '0.3s ease-out';

    const targetTop =
      errorElement.getBoundingClientRect().top + window.scrollY - 85;

    later(() => {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }, 20);
  }
}
