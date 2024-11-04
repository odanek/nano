import { NanoElement } from './element';
import { NanoRef } from './ref';

export type NanoNode = NanoElement | string | number | null;
export type NanoChildren = undefined | NanoNode | NanoNode[];
export type NanoComponent<T = unknown> = (props: T) => NanoNode;

export type NanoChildrenProp = {
  children?: NanoChildren;
};
export type NanoRefProp = {
  ref?: NanoRef;
};
export type NanoPropsWithChildren<T = unknown> = T & NanoChildrenProp;
