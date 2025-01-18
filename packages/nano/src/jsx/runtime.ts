import type { NanoElement } from '../vdom/element';
import { NanoFragment, type NanoFragmentProps } from '../vdom/fragment';
import {
  type NanoChildrenProps,
  type NanoKeyProps,
  type NanoNode,
} from '../vdom/type';
import { type NanoIntrinsicElements } from './intrinsic-elements';

export { jsx, jsxs, jsxDEV } from './factory';

export type Element = NanoNode;
export const Fragment: (
  props: NanoKeyProps & NanoChildrenProps,
) => NanoElement<NanoFragmentProps> = NanoFragment;
export type IntrinsicElements = NanoIntrinsicElements;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Element = NanoNode<any>;
    type IntrinsicElements = NanoIntrinsicElements;
  }
}
