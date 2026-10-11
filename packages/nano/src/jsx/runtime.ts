import type { PropsWithKey } from '../api';
import type { Empty, Primitive, PropsWithChildren } from '../core/renderable';
import type { FragmentVNode, VNode } from '../core/vnode';
import { Fragment as NanoFragment } from '../core/fragment';
import { type IntrinsicElements as NanoIntrinsicElements } from './intrinsic/index';

type NanoElement = VNode | Primitive | Empty;

export { jsx, jsxs, jsxDEV } from './factory';

export type Element = NanoElement;
export const Fragment: (
  props: PropsWithKey<PropsWithChildren>,
) => FragmentVNode = NanoFragment;
export type IntrinsicElements = NanoIntrinsicElements;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = NanoElement;
    type IntrinsicElements = NanoIntrinsicElements;
  }
}
