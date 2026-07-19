import type { AnyFunction } from './type';

export function isValue(value: unknown): value is NonNullable<unknown> {
  return value !== undefined && value !== null;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return Number.isFinite(value);
}

export function isFunction(value: unknown): value is AnyFunction {
  return typeof value === 'function';
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function isIterable(value: unknown): value is Iterable<unknown> {
  return (
    value !== null &&
    value !== undefined &&
    // @ts-expect-error TS complains about conversion to any
    typeof value[Symbol.iterator] === 'function'
  );
}
