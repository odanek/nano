import { NanoElement } from '../vdom/element';
import { NanoIntrinsicElements } from './intrinsic-elements';

export { jsx, jsxs } from './factory';
export type Element = NanoElement;
export type IntrinsicElements = NanoIntrinsicElements;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = NanoElement;
    type IntrinsicElements = NanoIntrinsicElements;
  }
}
