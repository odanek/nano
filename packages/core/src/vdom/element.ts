import { NanoElementTag, NanoElementKey, NanoElementType, NanoChildren, NanoNode } from './type';
import { NanoRef } from './ref';
import { PlainObject } from '@nano-ui/type';

export type NanoTextElementProps = { text: string };
export type NanoFragmentElementProps = { children: NanoElement[] };

export class NanoElement<P = PlainObject> {
  public tag: NanoElementTag;
  // TODO Remove null - have special values for text, fragment, context?
  public type: NanoElementType;
  public key: NanoElementKey;
  public ref: NanoRef | null;
  public props: P;

  constructor(
    tag: NanoElementTag,
    type: NanoElementType,
    key: NanoElementKey,
    ref: NanoRef | null,
    props: P,
  ) {
    this.tag = tag;
    this.type = type;
    this.key = key;
    this.ref = ref;
    this.props = props;
    Object.freeze(this);
  }

  public cloneWithProps<P = PlainObject>(props: P): NanoElement<P> {
    return new NanoElement(this.tag, this.type, this.key, this.ref, props);
  }

  static text(text: string): NanoElement<NanoTextElementProps> {
    return new NanoElement(NanoElementTag.HostText, null, null, null, { text });
  }

  // TODO <Fragment> element, ktery bere i key
  static fragment(children: NanoNode[], key: NanoElementKey) {
    return new NanoElement(NanoElementTag.Fragment, null, key, null, { children });
  }
}
