import { isFunction, isString } from '../shared/predicate';
import { emptyObject } from '../shared/object';
import type { Component } from '../core/renderable';
import type { Key } from '../core/key';
import {
  createComponentVNode,
  createElementVNode,
  type ComponentVNode,
  type ElementVNode,
  type VNode,
} from '../core/vnode';
import type { PropsWithRef } from '../core/ref';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ElementType = Component<any> | string;

export function jsx(type: ElementType, props: unknown, key?: Key): VNode {
  if (isString(type)) {
    return jsxElement(type, props, key);
  } else if (isFunction(type)) {
    return jsxComponent(type, props, key);
  } else {
    throw new Error('JSX: Invalid element type');
  }
}

export const jsxs: (type: ElementType, props: unknown, key?: Key) => VNode =
  jsx;

export const jsxDEV: (type: ElementType, props: unknown, key?: Key) => VNode =
  jsx;

function jsxElement(type: string, props: unknown, key?: Key): ElementVNode {
  const { ref, ...other } = (props as PropsWithRef) ?? emptyObject;
  return createElementVNode(type, other as unknown, ref ?? null, key ?? null);
}

function jsxComponent<T = unknown>(
  type: Component<T>,
  props: T,
  key?: Key,
): ComponentVNode<T> {
  return createComponentVNode(type, props, key ?? null);
}
