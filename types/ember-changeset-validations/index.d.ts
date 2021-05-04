/* eslint-disable no-unused-vars */
declare module 'ember-changeset-validations' {
  export default function lookupValidator(validator: Record<string, any>): any;
}

declare module 'ember-changeset-validations/validators' {
  export function validateNumber(obj: Record<string, any>): any;
  export function validatePresence(obj: Record<string, any> | boolean): any;
  export function validateInclusion(obj: Record<string, any>): any;
  export function validateFormat(obj: Record<string, any>): any;
}
