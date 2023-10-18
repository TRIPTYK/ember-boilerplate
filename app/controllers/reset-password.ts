import Controller from '@ember/controller';

import { tracked } from 'tracked-built-ins';

export default class ResetPasswordController extends Controller {
  @tracked token?: string;

  queryParams = ['token'];
}
