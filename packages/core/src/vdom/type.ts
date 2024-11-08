import { NanoElement } from './element';
import { NanoRef } from './ref';

export type NanoNode<P = unknown> = NanoElement<P> | string | number | null;
export type NanoChildren = undefined | NanoNode | NanoNode[];
export type NanoComponent<P = unknown> = (props: P) => NanoNode<P>;

export type NanoChildrenProp = {
  children?: NanoChildren;
};
export type NanoRefProp = {
  ref?: NanoRef;
};
export type NanoKeyProp = {
  key?: unknown;
};
