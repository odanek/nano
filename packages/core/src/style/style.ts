import { isPlainObject } from '@nano-ui/type';

export type StyleId = string;
export type StyleProvider = () => StyleBundle;
export type StyleBundle = {
  [key: string]: Style | StyleBundle;
};
export type StyleIdMap = {
  [key: string]: StyleId | StyleIdMap;
};
export type StyleSpec = {
  style: StyleBundle;
  classNames: StyleIdMap;
};

export class Style {
  public id: StyleId;
  public rule: string;

  constructor(id: StyleId, rule: string) {
    this.id = id;
    this.rule = rule;
  }

  toString() {
    return this.id;
  }
}

let lastId = 0;
function nextId(): StyleId {
  return 's' + ++lastId;
}

export function css(strings: string[], ...values: unknown[]): Style {
  const id = nextId();
  const definition = join(strings, values);
  const rule = `.${id} {${definition}}`;
  return new Style(id, rule);
}

export function keyframes(strings: string[], ...values: unknown[]): Style {
  const id = nextId();
  const definition = join(strings, values);
  const rule = `@keyframes ${id} {${definition}}`;
  return new Style(id, rule);
}

function join(strings: string[], values: unknown[]): string {
  const parts = [strings[0]];
  const length = values.length;
  for (let i = 0; i < length; i++) {
    const value = values[i];
    if (value === null || value === undefined) {
      throw new Error('Style value contains null or undefined');
    }
    const valueString =
      value instanceof Style ? '.' + value.id : value.toString();
    parts.push(valueString, strings[i + 1]);
  }
  return parts.join('');
}

// TODO Is it needed?
export function styleSpec(style: StyleBundle): StyleSpec {
  const classNames = styleClassNames(style);
  return { style, classNames };
}

function styleClassNames(style: StyleBundle): StyleIdMap {
  const result: StyleIdMap = {};
  for (const [key, value] of Object.entries(style)) {
    if (value instanceof Style) {
      result[key] = value.id;
    } else if (isPlainObject(value)) {
      result[key] = styleClassNames(value);
    }
  }
  return result;
}
