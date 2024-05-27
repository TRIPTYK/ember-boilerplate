import type Result from "true-myth/result";
import { err, ok, type Err } from "true-myth/result";
import type { Constructor, IterableElement } from "type-fest";

export function unwrap<T>(value:  Result<T,any>): T {
  if (value.isOk) {
    return value.value;
  }
  throw value.error;
}

// toResult(this.store.request(createRecord(userModel)), [AggregateError])
export function toResult<T, E extends Error[], Union extends IterableElement<E>>(value: Promise<T>, handledErrors: Constructor<Union>[]): Promise<Result<T, Union>> {
  return value.then(ok).catch((e) => {
    const knownError = handledErrors.find((error) => e instanceof error);
    if (knownError) {
      return err(e) as Result<T, Union>;
    }
    throw e;
  }) as Promise<Result<T, Union>>;
}
