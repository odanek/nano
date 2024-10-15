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

export type TypeDefinition = {
  check: TypePredicate;
  name: string;
};

function makeType(check: TypePredicate, name: string): TypeDefinition {
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
  arrayOf: (type: TypeDefinition) =>
    makeType(isArrayOf(type.check), 'array of ' + type.name),
  iterable: makeType(isIterable, 'iterable'),
  element: makeType(isElement, 'element'),
  anyOf: (...types: TypeDefinition[]) =>
    makeType(
      isAnyOf(...types.map((type) => type.check)),
      types.map((type) => type.name).join(' or '),
    ),
  instanceOf: (clazz: Function) =>
    makeType(isInstanceOf(clazz), 'instance of ' + clazz.name),
  optional: (type: TypeDefinition) =>
    makeType(isOptional(type.check), type.name + ' or no value'),
  enum: (Enum: Object, name: string) => makeType(isEnum(Enum), name),
};
