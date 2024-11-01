import { NanoElement } from './vdom/element';
import { NanoElementKey, NanoElementType } from './vdom/type';

export type NanoIntrinsicElements = {
  div: {
    id?: string;
    class?: string | string[],
  };
};

export type Element = NanoElement;
export type IntrinsicElements = NanoIntrinsicElements;

export function jsx(
  type: NanoElementType,
  props: unknown,
  key?: NanoElementKey,
) {}

export const jsxs = jsx;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = NanoElement;
    type IntrinsicElements = NanoIntrinsicElements;
  }
}
