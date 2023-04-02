import Controller from '@ember/controller';
import { tracked } from 'tracked-built-ins';

// eslint-disable-next-line ember/no-controllers
export default class ResetPasswordController extends Controller {
  @tracked token?: string;

  queryParams = ['token'];
}
