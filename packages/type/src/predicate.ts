import { PlainObject, ValueOf } from './type';

export type TypePredicate<T> = (value: unknown) => value is T;

export const isArray: TypePredicate<unknown[]> = Array.isArray;

export const isNumber: TypePredicate<number> =
  Number.isFinite as TypePredicate<number>;

export const isInteger: TypePredicate<number> =
  Number.isInteger as TypePredicate<number>;

export const isBoolean: TypePredicate<boolean> = (value: unknown) =>
  value === false || value === true;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction: TypePredicate<Function> = (value: unknown) =>
  typeof value === 'function';

export const isObject: TypePredicate<object> = (
  value: unknown,
): value is object =>
  value !== null && typeof value === 'object' && !isArray(value);

export const isValue: TypePredicate<NonNullable<unknown>> = (value: unknown) =>
  value !== null && value !== undefined;

export const isNoValue: TypePredicate<null | undefined> = (value: unknown) =>
  value === null || value === undefined;

export const isString: TypePredicate<string> = (value: unknown) =>
  typeof value === 'string';

export const isPlainObject: TypePredicate<PlainObject> = (
  value: unknown,
): value is PlainObject =>
  isObject(value) && Object.getPrototypeOf(value) === Object.prototype;

export const isPositiveInteger: TypePredicate<number> = (
  value: unknown,
): value is number => isInteger(value) && value > 0;

export const isNegativeInteger: TypePredicate<number> = (
  value: unknown,
): value is number => isInteger(value) && value < 0;

export const isNonNegativeInteger: TypePredicate<number> = (
  value: unknown,
): value is number => isInteger(value) && value >= 0;

export const isElement: TypePredicate<Element> = (value: unknown) =>
  value instanceof Element;

export const isUndefined: TypePredicate<undefined> = (value: unknown) =>
  value === undefined;

export const isNull: TypePredicate<null> = (value: unknown) => value === null;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isInstanceOf = function (Class: Function): TypePredicate<unknown> {
  return (value: unknown): value is unknown => value instanceof Class;
};

export const isIterable: TypePredicate<Iterable<unknown>> = function (
  value: unknown,
): value is Iterable<unknown> {
  return (
    value !== null &&
    value !== undefined &&
    // @ts-expect-error TS complains about conversion to any
    typeof value[Symbol.iterator] === 'function'
  );
};

export function isEnum<T extends object>(Enum: T): TypePredicate<ValueOf<T>> {
  const values = new Set(Object.values(Enum));
  return (value: unknown): value is ValueOf<T> => values.has(value);
}

export function isOptional<T>(
  type: TypePredicate<T>,
): TypePredicate<T | null | undefined> {
  return (value: unknown) => isNoValue(value) || type(value);
}

export function isArrayOf<T>(type: TypePredicate<T>): TypePredicate<T[]> {
  return (value: unknown) => isArray(value) && value.every(type);
}

export function isAnyOf(
  ...types: TypePredicate<unknown>[]
): TypePredicate<unknown> {
  return (value: unknown): value is unknown =>
    types.some((type) => type(value));
}
