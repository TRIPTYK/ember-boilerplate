import { getter } from 'ember-cli-page-object/macros';
import { setTempusDominusDate } from '@triptyk/ember-input/test-support/datepicker-helpers';

export function datepickable(selector: string) {
  return getter(function () {
    return (date: Date | string | undefined) => {
      setTempusDominusDate(selector, date);
      return this;
    };
  });
}
