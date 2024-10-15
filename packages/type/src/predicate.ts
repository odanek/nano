export type TypePredicate = (value: any) => boolean;

export const isArray = Array.isArray;
export const isArrayOf = (type: TypePredicate) => (value: any) => isArray(value) && value.every(type);
export const isNumber = Number.isFinite;
export const isInteger = Number.isInteger;
export const isBoolean = (value: any) => value === false || value === true;
export const isFunction = (value: any) => typeof value === 'function';
export const isObject = (value: any) => value !== null && typeof value === 'object' && !isArray(value);
export const isValue = (value: any) => value !== null && value !== undefined;
export const isNoValue = (value: any) => value === null || value === undefined;
export const isString = (value: any) => typeof value === 'string';
export const isPlainObject = (value: any) => isObject(value) && Object.getPrototypeOf(value) === Object.prototype;
export const isPositiveInteger = (value: any) => isInteger(value) && value > 0;
export const isNegativeInteger = (value: any) => isInteger(value) && value < 0;
export const isNonNegativeInteger = (value: any) => isInteger(value) && value >= 0;
export const isElement = (value: any) => value instanceof Element;
export const isAnyOf = (...types: TypePredicate[]) => (value: any) => types.some(type => type(value));
export const isUndefined = (value: any) => value === undefined;
export const isNull = (value: any) => value === null;
export const isInstanceOf = (Class: Function) => (value: any) => value instanceof Class;
export const isIterable = (value: any) => value !== null && value !== undefined && typeof value[Symbol.iterator] === 'function';
export const isOptional = (type: TypePredicate) => (value: any) => isNoValue(value) || type(value);
export const isEnum = (Enum: any) => {
    const values = new Set(Object.values(Enum));
    return (value: any) => values.has(value);
}