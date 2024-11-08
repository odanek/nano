import { NanoNode } from '../vdom/type';
import { NanoIntrinsicElements } from './intrinsic-elements';

export { jsx, jsxs, jsxDEV } from './factory';

export type Element = NanoNode;
export type IntrinsicElements = NanoIntrinsicElements;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Element = NanoNode<any>;
    type IntrinsicElements = NanoIntrinsicElements;
  }
}
