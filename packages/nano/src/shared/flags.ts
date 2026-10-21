/**
 * Checks whether every bit of `flag` is set in the `value` bit field.
 *
 * When `flag` combines several bits, all of them must be set. A `flag` of `0`
 * is always considered set.
 *
 * @param value - Bit field to test.
 * @param flag - Bit or combination of bits to look for.
 * @returns `true` if all bits of `flag` are set in `value`, otherwise `false`.
 */
export function isFlag(value: number, flag: number): boolean {
  return (value & flag) === flag;
}
