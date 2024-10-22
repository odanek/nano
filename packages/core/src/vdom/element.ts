import { NanoElementTag, NanoElementKey, NanoElementType } from './type';
import { NanoRef } from './ref';
import { NanoContextComponentProps } from './context';
import { PlainObject } from '@nano-ui/type';

export type NanoTextElementProps = { text: string };
export type NanoFragmentElementProps = { children: NanoElement[] };

export class NanoElement<T = PlainObject> {
  public tag: NanoElementTag;
  // TODO Remove null - have special values for text and fragment
  public type: NanoElementType | null;
  public key: NanoElementKey;
  public ref: NanoRef | null;
  public props: T;

  constructor(
    tag: NanoElementTag,
    type: NanoElementType | null,
    key: NanoElementKey,
    ref: NanoRef | null,
    props: T,
  ) {
    this.tag = tag;
    this.type = type;
    this.key = key;
    this.ref = ref;
    this.props = props;
    Object.freeze(this);
  }

  public cloneWithProps<T = PlainObject>(props: T): NanoElement<T> {
    return new NanoElement(this.tag, this.type, this.key, this.ref, props);
  }

  static text(text: string): NanoElement<NanoTextElementProps> {
    return new NanoElement(NanoElementTag.HostText, null, null, null, { text });
  }

  static context<T>(
    key: object,
    value: T,
  ): NanoElement<NanoContextComponentProps<T>> {
    return new NanoElement(NanoElementTag.Context, null, key, null, { value });
  }

  static fragment(
    children: NanoElement[],
  ): NanoElement<NanoFragmentElementProps> {
    return new NanoElement(NanoElementTag.Fragment, null, null, null, {
      children,
    });
  }
}
