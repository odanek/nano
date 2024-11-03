export type NanoStyleId = string;
export type NanoStyleProvider<T extends NanoStyleBundle = NanoStyleBundle> = () => T;
export type NanoStyleBundle = {
  [key: string]: NanoStyle | NanoStyleBundle;
};

export class NanoStyle {
  public id: NanoStyleId;
  public rule: string;

  constructor(id: NanoStyleId, rule: string) {
    this.id = id;
    this.rule = rule;
  }

  public toString() {
    return this.id;
  }
}

let lastId = 0;
function nextId(): NanoStyleId {
  return 's' + ++lastId;
}

export function css(strings: string[], ...values: unknown[]): NanoStyle {
  const id = nextId();
  const definition = join(strings, values);
  const rule = `.${id} {${definition}}`;
  return new NanoStyle(id, rule);
}

export function keyframes(strings: string[], ...values: unknown[]): NanoStyle {
  const id = nextId();
  const definition = join(strings, values);
  const rule = `@keyframes ${id} {${definition}}`;
  return new NanoStyle(id, rule);
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
      value instanceof NanoStyle ? '.' + value.id : value.toString();
    parts.push(valueString, strings[i + 1]);
  }
  return parts.join('');
}
