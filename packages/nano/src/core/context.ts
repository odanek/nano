import type { Context, ContextProps } from '../api/context';
import type { Fiber } from '../reconciler/fiber';
import type { ContextVNode } from '../api/vnode';
import { createContextVNode } from '../core/vnode';

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
