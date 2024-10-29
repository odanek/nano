export type PlainObject = { [name: string]: unknown };
export type AnyFunction = (...args: unknown[]) => unknown;
export type ValueOf<T> = T[keyof T];
