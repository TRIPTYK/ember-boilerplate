import type Result from "true-myth/result";

export default function unwrap<T>(value:  Result<T,any>): T {
  if (value.isOk) {
    return value.value;
  }
  throw value.error;
}
