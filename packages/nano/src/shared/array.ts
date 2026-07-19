export const emptyArray: readonly [] = Object.freeze([]);

export function arrayEquals<T>(
  left: readonly T[],
  right: readonly T[],
): boolean {
  if (left === right) {
    return true;
  }

  const length = left.length;
  if (length !== right.length) {
    return false;
  }

  for (let i = 0; i < length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}
