import { PlainObject } from '@nano-ui/type';
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

export type NanoElementKey = unknown;
export type NanoElementType = null | string | NanoComponent;

export type NanoNode = NanoElement | string | number | null;
export type NanoComponent<T = PlainObject> = (props: T) => NanoNode;
