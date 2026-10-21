/** Any function, regardless of its parameters and return type. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

/** Object with string keys and values of unknown type. */
export type PlainObject = Record<string, unknown>;

/**
 * Union of the value types of `T`'s properties.
 *
 * @example
 * const Phase = { Begin: 1, End: 2 } as const;
 * type Phase = ValueOf<typeof Phase>; // 1 | 2
 */
export type ValueOf<T> = T[keyof T];
