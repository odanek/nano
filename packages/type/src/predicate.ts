import { AnyEnum, AnyFunction, PlainObject, ValueOf } from './type';

export type TypePredicate<T> = (value: unknown) => value is T;

export const isUndefined: TypePredicate<undefined> = (value: unknown) =>
  value === undefined;
export const isNull: TypePredicate<null> = (value: unknown) => value === null;
export const isValue: TypePredicate<NonNullable<unknown>> = (value: unknown) =>
  value !== null && value !== undefined;
export const isNoValue: TypePredicate<null | undefined> = (value: unknown) =>
  value === null || value === undefined;
export function isOptional<T>(
  type: TypePredicate<T>,
): TypePredicate<T | null | undefined> {
  return (value: unknown) => isNoValue(value) || type(value);
}

export const isBoolean: TypePredicate<boolean> = (value: unknown) =>
  value === false || value === true;

export const isString: TypePredicate<string> = (value: unknown) =>
  typeof value === 'string';
export const isEmptyString: TypePredicate<string> = (
  value: unknown,
): value is string => typeof value === 'string' && value.length === 0;
export const isNonEmptyString: TypePredicate<string> = (
  value: unknown,
): value is string => typeof value === 'string' && value.length > 0;

export const isNumber: TypePredicate<number> =
  Number.isFinite as TypePredicate<number>;
export const isInteger: TypePredicate<number> =
  Number.isInteger as TypePredicate<number>;
export const isPositiveInteger: TypePredicate<number> = (
  value: unknown,
): value is number => isInteger(value) && value > 0;
export const isNegativeInteger: TypePredicate<number> = (
  value: unknown,
): value is number => isInteger(value) && value < 0;
export const isNonNegativeInteger: TypePredicate<number> = (
  value: unknown,
): value is number => isInteger(value) && value >= 0;

export const isFunction: TypePredicate<AnyFunction> = (
  value: unknown,
): value is AnyFunction => typeof value === 'function';

export const isPlainObject: TypePredicate<PlainObject> = (
  value: unknown,
): value is PlainObject =>
  typeof value === 'object' &&
  Object.getPrototypeOf(value) === Object.prototype;

export const isArray: TypePredicate<unknown[]> = Array.isArray;
export function isArrayOf<T>(type: TypePredicate<T>): TypePredicate<T[]> {
  return (value: unknown) => isArray(value) && value.every(type);
}
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

export const isElement: TypePredicate<Element> = (value: unknown) =>
  value instanceof Element;
export const isHtmlElement: TypePredicate<HTMLElement> = (value: unknown) =>
  value instanceof HTMLElement;
export const isSvgElement: TypePredicate<SVGElement> = (value: unknown) =>
  value instanceof SVGElement;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isInstanceOf = function (Class: Function): TypePredicate<unknown> {
  return (value: unknown): value is unknown => value instanceof Class;
};

export function isEnumValue<T extends AnyEnum>(
  Enum: T,
): TypePredicate<ValueOf<T>> {
  const values = new Set<unknown>(Object.values(Enum));
  return (value: unknown): value is ValueOf<T> => values.has(value);
}

export function isAnyOf(
  ...types: TypePredicate<unknown>[]
): TypePredicate<unknown> {
  return (value: unknown): value is unknown =>
    types.some((type) => type(value));
}
