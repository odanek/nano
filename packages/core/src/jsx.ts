import { NanoElement } from './vdom/element';
import { NanoElementKey, NanoElementType } from './vdom/type';

export type Element = NanoElement;

export function jsx(type: NanoElementType, props: unknown, key?: NanoElementKey) {

}

export const jsxs = jsx;

// Dodelat jsx-runtime export do package.json