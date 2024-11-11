import { isFunction, isString } from '@nano-ui/type';
import { NanoComponent } from '../vdom/type';
import { NanoElement, NanoElementKey, NanoElementType } from '../vdom/element';
import { emptyObject } from '@nano-ui/util';
import { NanoHostComponentProps, NanoHtmlProps } from '../vdom/host/type';

export function jsx(
  type: NanoElementType,
  props: unknown,
  key?: NanoElementKey,
): NanoElement {
  if (isString(type)) {
    return jsxHostComponent(
      type,
      props,
      key,
    ) as NanoElement<unknown>;
  } else if (isFunction(type)) {
    return jsxFunctionComponent(type, props, key) as NanoElement<unknown>;
  } else {
    throw new Error('JSX: Invalid element type');
  }
}

export const jsxs = jsx;
export const jsxDEV = jsx;

function jsxHostComponent(
  type: string,
  props: unknown,
  key?: NanoElementKey,
): NanoElement<unknown> {
  const { ref, ...other } = props ?? emptyObject;
  return NanoElement.hostComponent(type, other, ref ?? null, key);
}

function jsxFunctionComponent<T = unknown>(
  type: NanoComponent<T>,
  props: T,
  key?: NanoElementKey,
): NanoElement<T> {
  return NanoElement.functionComponent(type, props, key);
}
