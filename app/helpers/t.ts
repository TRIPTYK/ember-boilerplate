import { helper } from '@ember/component/helper';

export default helper(function t(positional: string[], named: Record<string, unknown>) {
  return positional.toString();
});
