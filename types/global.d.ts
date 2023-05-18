import { RequestHandler } from 'msw';

// Types for compiled templates
declare module 'ember-boilerplate/templates/*' {
  import type { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}

declare usersHandlers: RequestHandler[];