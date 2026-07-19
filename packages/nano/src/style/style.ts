import { isFunction } from '../shared/predicate';

export type NanoStyleId = string;
export type NanoStyleBundle = {
  [key: string]: NanoStyle;
};
export interface NanoStyleSheet<B extends NanoStyleBundle> {
  bundle: B;
  classNames: Record<keyof B, string>;
}

export class NanoStyle {
  public id: NanoStyleId;
  public rule: string;

  constructor(id: NanoStyleId, rule: string) {
    this.id = id;
    this.rule = rule;
  }

  public toString(): string {
    return this.id;
  }
}

let lastId = 0;
function nextId(): NanoStyleId {
  return 's' + ++lastId;
}

export function css(
  strings: TemplateStringsArray,
  ...values: unknown[]
): NanoStyle {
  const id = nextId();
  const definition = join(strings, values);
  const rule = `.${id} {${definition}}`;
  return new NanoStyle(id, rule);
}

export function keyframes(
  strings: TemplateStringsArray,
  ...values: unknown[]
): NanoStyle {
  const id = nextId();
  const definition = join(strings, values);
  const rule = `@keyframes ${id} {${definition}}`;
  return new NanoStyle(id, rule);
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
      value instanceof NanoStyle ? '.' + value.id : value.toString();
    parts.push(valueString, strings[i + 1]);
  }
  return parts.join('');
}

export function createStyleSheet<B extends NanoStyleBundle>(
  bundle: B | (() => B),
): NanoStyleSheet<B> {
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
