export const voidFunction = (): undefined => undefined;

export const trueFunction = (): true => true;

export const falseFunction = (): false => false;

export const nullFunction = (): null => null;

export const strictEquals = (a: unknown, b: unknown): boolean => a === b;

export const memoizeSingle = <T, U>(f: (arg: T) => U) => {
  const cache = new Map<T, U>();
  return (arg: T): U => {
    if (cache.has(arg)) {
      // @ts-expect-error We cannot get undefined since we are caching only values of U
      return cache.get(arg);
    } else {
      const value = f(arg);
      cache.set(arg, value);
      return value;
    }
  };
};
