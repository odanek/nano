export type PlainObject = Record<string, unknown>;
export type AnyEnum = Record<string, string | number>;
export type AnyFunction = (...args: unknown[]) => unknown;
export type ValueOf<T> = T[keyof T];
