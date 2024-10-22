import { NanoElement } from './element';
import { NanoComponent } from './type';

export type NanoContextComponentProps<T> = { value: T };

export function createContext<T>(): NanoComponent<
  NanoContextComponentProps<T>
> {
  const key = {};
  const Context = ({ value }: NanoContextComponentProps<T>) =>
    NanoElement.context(key, value);
  Context.key = key;
  return Context;
}
