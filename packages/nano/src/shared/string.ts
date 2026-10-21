/** Shared empty string constant. */
export const emptyString = '';

/**
 * Returns `string` with its first character converted to upper case.
 *
 * The rest of the string is left unchanged, and an empty string is returned
 * as is.
 *
 * @param string - String to capitalize.
 * @returns The capitalized string.
 *
 * @example
 * capitalizeFirstLetter('click'); // 'Click'
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
