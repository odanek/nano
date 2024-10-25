import { PlainObject } from '@nano-ui/type';
import { FlagGenerator } from '@nano-ui/util';
import { NanoElement } from './element';

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
export type NanoElementType = null | string | HTMLElement | SVGElement | NanoComponent;

export type NanoNode = NanoElement | string | number | null;
export type NanoChildren = NanoNode | NanoNode[];
export type NanoComponent<T = PlainObject> = (props: T) => NanoNode;

export type NanoPropsWithChildren<T> = T & {
  children?: NanoChildren;
};
export type NanoPropsWithKey<T> = T & {
  key?: NanoElementKey;
};
export type NanoPropsWithChildrenAndKey<T> = NanoPropsWithKey<
  NanoPropsWithChildren<T>
>;
