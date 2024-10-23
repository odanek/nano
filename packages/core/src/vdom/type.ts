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
