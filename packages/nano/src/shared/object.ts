/**
 * Shared frozen empty object.
 *
 * Use it as a default value instead of allocating a new `{}`, so that
 * "no properties" states keep a stable identity across renders.
 */
export const emptyObject: Readonly<Record<string | number, unknown>> =
  Object.freeze({});

/**
 * Shallowly compares two objects by their own enumerable string keys.
 *
 * The objects are equal when they are the same instance, or when they have the
 * same number of own enumerable keys and each key of `left` is an own property
 * of `right` with a strictly equal (`===`) value. Values are not compared
 * recursively, and prototypes and symbol keys are ignored.
 *
 * @param left - First object to compare.
 * @param right - Second object to compare.
 * @returns `true` if the objects are shallowly equal, otherwise `false`.
 */
export function objectEquals(
  left: Record<string, unknown>,
  right: Record<string, unknown>,
): boolean {
  if (left === right) {
    return true;
  }

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  for (const key of leftKeys) {
    if (!objectHasOwnProperty(right, key) || left[key] !== right[key]) {
      return false;
    }
  }
  return true;
}

/**
 * Checks whether `object` has `property` as its own (not inherited) property.
 *
 * Unlike calling `object.hasOwnProperty(property)` directly, this works for
 * objects created with `Object.create(null)` and objects that shadow
 * `hasOwnProperty`.
 *
 * @param object - Object to inspect.
 * @param property - Property name or index to look for.
 * @returns `true` if `property` is an own property of `object`, otherwise
 * `false`.
 */
export function objectHasOwnProperty(
  object: object,
  property: string | number,
): boolean {
  return Object.prototype.hasOwnProperty.call(object, property);
}
