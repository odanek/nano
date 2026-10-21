/**
 * Shared frozen empty array.
 *
 * Use it as a default value instead of allocating a new `[]`, so that
 * "no items" states keep a stable identity across renders.
 */
export const emptyArray: readonly [] = Object.freeze([]);

/**
 * Shallowly compares two arrays.
 *
 * The arrays are equal when they are the same instance, or when they have the
 * same length and every pair of items at the same index is strictly equal
 * (`===`). Items are not compared recursively.
 *
 * @param left - First array to compare.
 * @param right - Second array to compare.
 * @returns `true` if the arrays are shallowly equal, otherwise `false`.
 */
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
