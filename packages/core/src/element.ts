import { NanoElementTag, NanoElementKey, NanoElementProps, NanoElementType } from './type';
import { NanoRef } from './ref';

export class NanoElement {
  public tag: NanoElementTag;
  // TODO Remove null - have special values for text and fragment
  public type: NanoElementType | null;
  public key: NanoElementKey;
  public ref: NanoRef | null;
  public props: NanoElementProps;

  constructor(
    tag: NanoElementTag,
    type: NanoElementType | null,
    key: NanoElementKey,
    ref: NanoRef | null,
    props: NanoElementProps,
  ) {
    this.tag = tag;
    this.type = type;
    this.key = key;
    this.ref = ref;
    this.props = props;
    Object.freeze(this);
  }

  cloneWithProps(props: NanoElementProps) {
    return new NanoElement(this.tag, this.type, this.key, this.ref, props);
  }

  static text(text: string) {
    return new NanoElement(NanoElementTag.HostText, null, null, null, { text });
  }

  static fragment(children: NanoElement[]) {
    return new NanoElement(NanoElementTag.Fragment, null, null, null, { children });
  }
}
