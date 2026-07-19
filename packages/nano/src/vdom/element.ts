import { type NanoComponent } from './type';
import { NanoRef } from './ref';
import { type NanoHostTextProps } from '../dom/text'; // TODO
import { type NanoFragmentProps } from './fragment';
import { type NanoContext, type NanoContextProps } from './context';
import { type NanoPortalProps } from './portal';
import { type NanoDecoratorProps } from '../dom/decorator';
import type { ValueOf } from '../shared/type';

export const NanoElementTag = {
  HostRoot: 0,
  HostComponent: 1,
  HostText: 2,
  HostPortal: 3,
  HostDecorator: 4,
  FunctionComponent: 5,
  Fragment: 6,
  Context: 7,
};
export type NanoElementTagValue = ValueOf<typeof NanoElementTag>;

export type NanoElementKey = unknown;
export type NanoElementType<P = unknown> =
  | null
  | string
  | HTMLElement
  | SVGElement
  | NanoComponent<P>;

export class NanoElement<P = unknown> {
  public tag: NanoElementTagValue;
  public type: NanoElementType<P>;
  public key: NanoElementKey;
  public ref: NanoRef | null;
  public props: P;

  constructor(
    tag: NanoElementTagValue,
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

  static hostComponent<P>(
    type: string,
    props: P,
    ref: NanoRef | null,
    key: NanoElementKey,
  ): NanoElement<P> {
    return new NanoElement(NanoElementTag.HostComponent, type, key, ref, props);
  }

  static functionComponent<P>(
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

  static portal(
    props: NanoPortalProps,
    key: NanoElementKey,
  ): NanoElement<NanoPortalProps> {
    return new NanoElement(
      NanoElementTag.HostPortal,
      props.container,
      key,
      null,
      props,
    );
  }

  static decorator(
    props: NanoDecoratorProps,
    key: NanoElementKey,
  ): NanoElement<NanoDecoratorProps> {
    return new NanoElement(
      NanoElementTag.HostDecorator,
      null,
      key,
      null,
      props,
    );
  }
}
