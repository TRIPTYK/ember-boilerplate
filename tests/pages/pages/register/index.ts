import { create, hasClass, visitable } from 'ember-cli-page-object';

import { pagesFormsRegister } from '../../forms/register';

export default create({
  visit: visitable('/register'),
  forms: pagesFormsRegister,
  hasSuccess: hasClass('alert-success', 'div.flash-message'),
  hasError: hasClass('alert-danger', 'div.flash-message'),
});
