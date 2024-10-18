import { FiberTag } from './fiber';
import { FiberKey, FiberProps, FiberType } from './type';
import { Ref } from './ref';

export class Element {
  public tag: FiberTag;
  // TODO Remove null - have special values for text and fragment
  public type: FiberType | null;
  public key: FiberKey;
  public ref: Ref | null;
  public props: FiberProps;

  constructor(
    tag: FiberTag,
    type: FiberType | null,
    key: FiberKey,
    ref: Ref | null,
    props: FiberProps,
  ) {
    this.tag = tag;
    this.type = type;
    this.key = key;
    this.ref = ref;
    this.props = props;
    Object.freeze(this);
  }

  cloneWithProps(props: FiberProps) {
    return new Element(this.tag, this.type, this.key, this.ref, props);
  }

  static text(text: string) {
    return new Element(FiberTag.HostText, null, null, null, { text });
  }

  static fragment(children: Element[]) {
    return new Element(FiberTag.Fragment, null, null, null, { children });
  }
}
