import type { AnyFunction } from './type';

/**
 * Checks whether `value` is neither `undefined` nor `null`.
 *
 * Other falsy values such as `0`, `''` and `false` count as values.
 *
 * @param value - Value to test.
 * @returns `true` if `value` is not nullish, otherwise `false`.
 */
export function isValue(value: unknown): value is NonNullable<unknown> {
  return value !== undefined && value !== null;
}

/**
 * Checks whether `value` is a primitive string.
 *
 * `String` wrapper objects are not considered strings.
 *
 * @param value - Value to test.
 * @returns `true` if `value` is a string, otherwise `false`.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks whether `value` is a finite primitive number.
 *
 * `NaN`, `Infinity`, `-Infinity`, numeric strings and `Number` wrapper
 * objects are not considered numbers.
 *
 * @param value - Value to test.
 * @returns `true` if `value` is a finite number, otherwise `false`.
 */
export function isNumber(value: unknown): value is number {
  return Number.isFinite(value);
}

/**
 * Checks whether `value` is callable, including classes and async functions.
 *
 * @param value - Value to test.
 * @returns `true` if `value` is a function, otherwise `false`.
 */
export function isFunction(value: unknown): value is AnyFunction {
  return typeof value === 'function';
}

/**
 * Checks whether `value` is an array.
 *
 * Array-like objects and other iterables are not considered arrays.
 *
 * @param value - Value to test.
 * @returns `true` if `value` is an array, otherwise `false`.
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks whether `value` implements the iterable protocol, i.e. has a
 * `Symbol.iterator` method.
 *
 * Note that primitive strings are iterable too.
 *
 * @param value - Value to test.
 * @returns `true` if `value` is iterable, otherwise `false`.
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  return (
    value !== null &&
    value !== undefined &&
    // @ts-expect-error TS complains about conversion to any
    typeof value[Symbol.iterator] === 'function'
  );
}
