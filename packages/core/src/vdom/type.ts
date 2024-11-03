import { FlagGenerator } from '@nano-ui/util';
import { NanoElement } from './element';
import { NanoRef } from './ref';

export enum NanoElementTag {
  HostRoot,
  HostComponent,
  HostText,
  HostPortal,
  FunctionComponent,
  Fragment,
  Context,
}

const effectTagCounter = new FlagGenerator();
export enum NanoEffectTag {
  None = effectTagCounter.next(),
  Placement = effectTagCounter.next(),
  Update = effectTagCounter.next(),
  Lifecycle = effectTagCounter.next(),
  Deletion = effectTagCounter.next(),
  ContentReset = effectTagCounter.next(),
  Ref = effectTagCounter.next(),
}

export type NanoElementKey = unknown;
export type NanoElementType<P = unknown> =
  | null
  | string
  | HTMLElement
  | SVGElement
  | NanoComponent<P>;

export type NanoNode = NanoElement | string | number | null;
export type NanoChildren = undefined | NanoNode | NanoNode[];
export type NanoComponent<T = unknown> = (
  props: T,
) => Exclude<NanoChildren, undefined>;

export type NanoChildrenProp = {
  children?: NanoChildren;
};
export type NanoRefProp = {
  ref?: NanoRef;
};
export type NanoPropsWithChildren<T = unknown> = T & NanoChildrenProp;
