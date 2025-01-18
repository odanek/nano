// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;
export type PlainObject = Record<string, unknown>;

export const emptyObject: Readonly<Record<(string | number), unknown>> = Object.freeze({});
export const emptyArray: readonly [] = Object.freeze([]);
export const emptyString = '';

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

export function isFlag(value: number, flag: number): boolean {
  return (value & flag) === flag;
}

export function objectEquals(
  left: Record<string, unknown>,
  right: Record<string, unknown>,
): boolean {
  if (left === right) {
    return true;
  }

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  for (const key of leftKeys) {
    if (!objectHasOwnProperty(right, key) || left[key] !== right[key]) {
      return false;
    }
  }
  return true;
}

export function objectHasOwnProperty(
  object: object,
  property: string | number,
): boolean {
  return Object.prototype.hasOwnProperty.call(object, property);
}

export function arrayEquals<T>(
  left: readonly T[],
  right: readonly T[],
): boolean {
  if (left === right) {
    return true;
  }

  const length = left.length;
  if (length !== right.length) {
    return false;
  }

  for (let i = 0; i < length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
