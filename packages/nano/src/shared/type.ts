// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;
export type PlainObject = Record<string, unknown>;
export type ValueOf<T> = T[keyof T];

export const emptyArray: readonly [] = Object.freeze([]);
export const emptyString = '';
