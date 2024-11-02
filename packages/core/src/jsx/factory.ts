import { isFunction, isString } from '@nano-ui/type';
import { NanoComponent, NanoElementKey, NanoElementType } from '../vdom/type';
import { NanoHostComponentProps } from '../vdom/host-component';
import { NanoElement } from '../vdom/element';
import { emptyObject } from '@nano-ui/util';

export function jsx(
  type: NanoElementType,
  props: unknown,
  key?: NanoElementKey,
): NanoElement {
  if (isString(type)) {
    return jsxHostComponent(
      type,
      props as NanoHostComponentProps,
      key,
    ) as NanoElement<unknown>;
  } else if (isFunction(type)) {
    return jsxFunctionComponent(type, props, key) as NanoElement<unknown>;
  } else {
    throw new Error('JSX: Invalid element type');
  }
}

export const jsxs = jsx;

function jsxHostComponent(
  type: string,
  props: NanoHostComponentProps,
  key?: NanoElementKey,
): NanoElement<NanoHostComponentProps> {
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
