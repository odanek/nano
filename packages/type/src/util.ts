import { TypeMatcher } from './matcher';
import { PlainObject } from './type';

export function checkTypes(
  object: PlainObject,
  types: Record<string, TypeMatcher<unknown>>,
): void {
  for (const [key, type] of Object.entries(types)) {
    if (!type.check(object[key])) {
      throw new Error(
        `Property ${key} has incorrect type, ${type.name} expected`,
      );
    }
  }
}
