import { type NanoComponent, type NanoRefProps } from '../vdom/type';
import {
  NanoElement,
  type NanoElementKey,
  type NanoElementType,
} from '../vdom/element';
import { emptyObject, isFunction, isString } from '../util';

export function jsx(
  type: NanoElementType,
  props: unknown,
  key?: NanoElementKey,
): NanoElement {
  if (isString(type)) {
    return jsxHostComponent(type, props, key) as NanoElement<unknown>;
  } else if (isFunction(type)) {
    return jsxFunctionComponent(type, props, key) as NanoElement<unknown>;
  } else {
    throw new Error('JSX: Invalid element type');
  }
}

export const jsxs: (
  type: NanoElementType,
  props: unknown,
  key?: NanoElementKey,
) => NanoElement = jsx;
export const jsxDEV: (
  type: NanoElementType,
  props: unknown,
  key?: NanoElementKey,
) => NanoElement = jsx;

function jsxHostComponent(
  type: string,
  props: unknown,
  key?: NanoElementKey,
): NanoElement<unknown> {
  const { ref, ...other } = (props as NanoRefProps) ?? emptyObject;
  return NanoElement.hostComponent(
    type,
    other as unknown,
    ref ?? null,
    key ?? null,
  );
}

function jsxFunctionComponent<T = unknown>(
  type: NanoComponent<T>,
  props: T,
  key?: NanoElementKey,
): NanoElement<T> {
  return NanoElement.functionComponent(type, props, key ?? null);
}
