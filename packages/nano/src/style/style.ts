import type { Style, StyleBundle, StyleId, StyleSheet } from '../api/style';
import { isFunction } from '../shared/predicate';

export class StyleImpl implements Style {
  public id: StyleId;
  public rule: string;

  constructor(id: StyleId, rule: string) {
    this.id = id;
    this.rule = rule;
  }

  public toString(): string {
    return this.id;
  }
}

let lastId = 0;
function nextId(): StyleId {
  return 's' + ++lastId;
}

export function css(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Style {
  const id = nextId();
  const definition = join(strings, values);
  const rule = `.${id} {${definition}}`;
  return new StyleImpl(id, rule);
}

export function keyframes(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Style {
  const id = nextId();
  const definition = join(strings, values);
  const rule = `@keyframes ${id} {${definition}}`;
  return new StyleImpl(id, rule);
}

function join(strings: TemplateStringsArray, values: unknown[]): string {
  const parts = [strings[0]];
  const length = values.length;
  for (let i = 0; i < length; i++) {
    const value = values[i];
    if (value === null || value === undefined) {
      throw new Error('Style value contains null or undefined');
    }
    const valueString =
      value instanceof StyleImpl ? '.' + value.id : value.toString();
    parts.push(valueString, strings[i + 1]);
  }
  return parts.join('');
}

export function createStyleSheet<B extends StyleBundle>(
  bundle: B | (() => B),
): StyleSheet<B> {
  if (isFunction(bundle)) {
    bundle = bundle();
  }

  const classNames = {} as Record<keyof B, string>;
  for (const [key, value] of Object.entries(bundle)) {
    classNames[key as keyof B] = value.id;
  }

  return {
    bundle,
    classNames,
  };
}
