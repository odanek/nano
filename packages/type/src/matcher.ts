import {
  isAnyOf,
  isArray,
  isArrayOf,
  isBoolean,
  isElement,
  isEmptyString,
  isEnumValue,
  isFunction,
  isHtmlElement,
  isInstanceOf,
  isInteger,
  isIterable,
  isNegativeInteger,
  isNonEmptyString,
  isNonNegativeInteger,
  isNoValue,
  isNull,
  isNumber,
  isOptional,
  isPlainObject,
  isPositiveInteger,
  isString,
  isSvgElement,
  isUndefined,
  isValue,
  TypePredicate,
} from './predicate';
import { AnyEnum, ValueOf } from './type';

export type TypeMatcher<T> = {
  predicate: TypePredicate<T>;
  name: string;
};

function makeType<T>(
  predicate: TypePredicate<T>,
  name: string,
): TypeMatcher<T> {
  return { predicate, name };
}

export const Type = {
  undefined: makeType(isUndefined, 'undefined'),
  null: makeType(isNull, 'null'),
  value: makeType(isValue, 'any value'),
  noValue: makeType(isNoValue, 'null or undefined'),
  optional: function <T>(
    type: TypeMatcher<T>,
  ): TypeMatcher<T | null | undefined> {
    return makeType(isOptional(type.predicate), type.name + ' or no value');
  },
  boolean: makeType(isBoolean, 'boolean'),
  string: makeType(isString, 'string'),
  emptyString: makeType(isEmptyString, 'empty string'),
  nonEmptyString: makeType(isNonEmptyString, 'non-empty string'),
  number: makeType(isNumber, 'number'),
  integer: makeType(isInteger, 'integer'),
  positiveInteger: makeType(isPositiveInteger, 'positive integer'),
  negativeInteger: makeType(isNegativeInteger, 'negative integer'),
  nonNegativeInteger: makeType(isNonNegativeInteger, 'non-negative integer'),
  function: makeType(isFunction, 'function'),
  plainObject: makeType(isPlainObject, 'plain object'),
  array: makeType(isArray, 'array'),
  arrayOf: function <T>(type: TypeMatcher<T>): TypeMatcher<T[]> {
    return makeType(isArrayOf(type.predicate), 'array of ' + type.name);
  },
  iterable: makeType(isIterable, 'iterable'),
  element: makeType(isElement, 'element'),
  htmlElement: makeType(isHtmlElement, 'HTMLElement'),
  svgElement: makeType(isSvgElement, 'SVGElement'),
  anyOf: function (...types: TypeMatcher<unknown>[]): TypeMatcher<unknown> {
    return makeType(
      isAnyOf(...types.map((type) => type.predicate)),
      types.map((type) => type.name).join(' or '),
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  instanceOf: function (clazz: Function): TypeMatcher<unknown> {
    return makeType(isInstanceOf(clazz), 'instance of ' + clazz.name);
  },
  enumValue: function <T extends AnyEnum>(
    Enum: T,
    name: string,
  ): TypeMatcher<ValueOf<T>> {
    return makeType(isEnumValue(Enum), name);
  },
};
