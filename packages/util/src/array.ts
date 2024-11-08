import { strictEquals } from './function';

export const emptyArray = Object.freeze([]);

export function arrayEquals<T>(
  left: T[],
  right: T[],
  comparator = strictEquals,
): boolean {
  if (left === right) {
    return true;
  }

  const length = left.length;
  if (length !== right.length) {
    return false;
  }

  for (let i = 0; i < length; i++) {
    if (!comparator(left[i], right[i])) {
      return false;
    }
  }
  return true;
}

export function arrayFirst<T, U>(array: T[], defaultValue: U): T | U {
  // @ts-expect-error Cannot return undefined
  return array.length > 0 ? array[0] : defaultValue;
}

export function arrayLast<T, U>(array: T[], defaultValue: U): T | U {
  const length = array.length;
  // @ts-expect-error Cannot return undefined
  return length > 0 ? array[length - 1] : defaultValue;
}

export function arrayAt<T, U>(
  array: T[],
  index: number,
  defaultValue: U,
): T | U {
  const length = array.length;
  if (index < 0) {
    index = length + index;
  }
  // @ts-expect-error Cannot return undefined
  return index >= 0 && index < length ? array[index] : defaultValue;
}

export function reverseArray<T>(array: T[]): T[] {
  if (array.length === 0) {
    return [];
  } else {
    return array.slice().reverse();
  }
}
