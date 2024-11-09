import { NanoComponent } from './type';
import { NanoRef } from './ref';
import { NanoHostTextProps } from './host/text';
import { NanoFragmentProps } from './fragment';
import { NanoContext, NanoContextProps } from './context';
import { NanoHostComponentProps } from './host/type';

export enum NanoElementTag {
  HostRoot,
  HostComponent,
  HostText,
  HostPortal,
  FunctionComponent,
  Fragment,
  Context,
}

export type NanoElementKey = unknown;
export type NanoElementType<P = unknown> =
  | null
  | string
  | HTMLElement
  | SVGElement
  | NanoComponent<P>;

export class NanoElement<P = unknown> {
  public tag: NanoElementTag;
  public type: NanoElementType<P>;
  public key: NanoElementKey;
  public ref: NanoRef | null;
  public props: P;

  constructor(
    tag: NanoElementTag,
    type: NanoElementType<P>,
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

  public cloneWithProps(props: P): NanoElement<P> {
    return new NanoElement(this.tag, this.type, this.key, this.ref, props);
  }

  static text(text: string): NanoElement<NanoHostTextProps> {
    return new NanoElement(NanoElementTag.HostText, null, null, null, text);
  }

  static hostComponent(
    type: string,
    props: NanoHostComponentProps,
    ref: NanoRef | null,
    key: NanoElementKey,
  ): NanoElement<NanoHostComponentProps> {
    return new NanoElement(NanoElementTag.HostComponent, type, key, ref, props);
  }

  static functionComponent<P = unknown>(
    type: NanoComponent<P>,
    props: P,
    key: NanoElementKey,
  ): NanoElement<P> {
    return new NanoElement(
      NanoElementTag.FunctionComponent,
      type,
      key,
      null,
      props,
    );
  }

  static context<T>(
    context: NanoContext<T>,
    props: NanoContextProps<T>,
  ): NanoElement<NanoContextProps<T>> {
    return new NanoElement(NanoElementTag.Context, context, null, null, props);
  }

  static fragment(
    props: NanoFragmentProps,
    key: NanoElementKey,
  ): NanoElement<NanoFragmentProps> {
    return new NanoElement(NanoElementTag.Fragment, null, key, null, props);
  }
}
