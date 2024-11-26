import { NanoElement } from './element';
import { NanoRef } from './ref';

export type NanoNode<P = unknown> = NanoElement<P> | string | number | null;
export type NanoChildren = undefined | NanoNode | Iterable<NanoNode>;
export type NanoComponent<P = unknown> = (props: P) => NanoNode<P>;

export type NanoChildrenProps = {
  children?: NanoChildren | undefined;
};
export type NanoRefProps = {
  ref?: NanoRef | undefined;
};
export type NanoKeyProps = {
  key?: unknown | undefined;
};
