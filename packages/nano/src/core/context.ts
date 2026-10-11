import type { Fiber } from '../reconciler/fiber'; // TODO This file should not depend on reconciler
import type { PropsWithKey } from './key';
import type { PropsWithChildren } from './renderable';
import { createContextVNode, type ContextVNode } from './vnode';

export type Context<T = unknown> = (props: ContextProps<T>) => ContextVNode<T>;
export type ContextProps<T = unknown> = PropsWithKey<
  PropsWithChildren<{ value: T }>
>;
export type ContextKey = number;

let id = 1;
const contextKeyMarker = Symbol('nano-context-key');
const contextNameMarker = Symbol('nano-context-name');
export const emptyContext: Record<string, unknown> = Object.freeze({});

export function createContext<T>(name: string): Context<T> {
  const ContextFunc = (props: ContextProps<T>): ContextVNode<T> =>
    createContextVNode(ContextFunc, props);
  ContextFunc[contextKeyMarker] = id++;
  ContextFunc[contextNameMarker] = name;
  return ContextFunc;
}

// TODO Where to put this?
export function compareContext(current: Fiber, workInProgress: Fiber): boolean {
  const types = workInProgress.contextTypes;
  const oldContext = current.fullContext;
  const newContext = workInProgress.fullContext;
  for (const type of types) {
    if (oldContext[type] !== newContext[type]) {
      return false;
    }
  }
  return true;
}

export function getContextKey<T>(context: Context<T>): ContextKey {
  // @ts-expect-error Marker is always set
  return context[contextKeyMarker];
}

export function getContextName<T>(context: Context<T>): string {
  // @ts-expect-error Marker is always set
  return context[contextNameMarker];
}
