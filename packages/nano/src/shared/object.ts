export const emptyObject: Readonly<Record<string | number, unknown>> =
  Object.freeze({});

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

export function objectHasOwnProperty(
  object: object,
  property: string | number,
): boolean {
  return Object.prototype.hasOwnProperty.call(object, property);
}
