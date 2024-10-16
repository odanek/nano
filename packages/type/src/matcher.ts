import {
  isAnyOf,
  isArray,
  isArrayOf,
  isBoolean,
  isElement,
  isEnum,
  isFunction,
  isInstanceOf,
  isInteger,
  isIterable,
  isNegativeInteger,
  isNonNegativeInteger,
  isNoValue,
  isNull,
  isNumber,
  isObject,
  isOptional,
  isPlainObject,
  isPositiveInteger,
  isString,
  isUndefined,
  isValue,
  TypePredicate,
} from './predicate';
import { ValueOf } from './type';

export type TypeMatcher<T> = {
  check: TypePredicate<T>;
  name: string;
};

function makeType<T>(check: TypePredicate<T>, name: string): TypeMatcher<T> {
  return { check, name };
}

export const Type = {
  undefined: makeType(isUndefined, 'undefined'),
  null: makeType(isNull, 'null'),
  boolean: makeType(isBoolean, 'boolean'),
  string: makeType(isString, 'string'),
  number: makeType(isNumber, 'number'),
  integer: makeType(isInteger, 'integer'),
  positiveInteger: makeType(isPositiveInteger, 'positive integer'),
  negativeInteger: makeType(isNegativeInteger, 'negative integer'),
  nonNegativeInteger: makeType(isNonNegativeInteger, 'non-negative integer'),
  function: makeType(isFunction, 'function'),
  object: makeType(isObject, 'object'),
  plainObject: makeType(isPlainObject, 'plain object'),
  value: makeType(isValue, 'any value'),
  noValue: makeType(isNoValue, 'null or undefined'),
  array: makeType(isArray, 'array'),
  arrayOf: function <T>(type: TypeMatcher<T>): TypeMatcher<T[]> {
    return makeType(isArrayOf(type.check), 'array of ' + type.name);
  },
  iterable: makeType(isIterable, 'iterable'),
  element: makeType(isElement, 'element'),
  anyOf: function (...types: TypeMatcher<unknown>[]): TypeMatcher<unknown> {
    return makeType(
      isAnyOf(...types.map((type) => type.check)),
      types.map((type) => type.name).join(' or '),
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  instanceOf: function (clazz: Function): TypeMatcher<unknown> {
    return makeType(isInstanceOf(clazz), 'instance of ' + clazz.name);
  },
  optional: function <T>(
    type: TypeMatcher<T>,
  ): TypeMatcher<T | null | undefined> {
    return makeType(isOptional(type.check), type.name + ' or no value');
  },
  enum: function <T extends object>(
    Enum: T,
    name: string,
  ): TypeMatcher<ValueOf<T>> {
    return makeType(isEnum(Enum), name);
  },
};
