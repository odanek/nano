import { NanoElement } from './element';
import { NanoFiber } from './fiber';
import { NanoChildrenProps, NanoComponent, NanoKeyProps } from './type';

export type NanoContextKey = number;
export type NanoContext<T = unknown> = NanoComponent<NanoContextProps<T>>;
export type NanoContextProps<T = unknown> = { value: T } & NanoChildrenProps &
  NanoKeyProps;

let id = 1;
const contextKeyMarker = Symbol('nano-context-key');
const contextNameMarker = Symbol('nano-context-name');
export const emptyContext: Record<string, unknown> = Object.freeze({});

export function createContext<T>(name: string): NanoContext<T> {
  const Context = (
    props: NanoContextProps<T>,
  ): NanoElement<NanoContextProps<T>> => NanoElement.context(Context, props);
  Context[contextKeyMarker] = id++;
  Context[contextNameMarker] = name;
  return Context;
}

export function readContext(
  workInProgress: NanoFiber,
): Record<NanoContextKey, unknown> | null {
  const types = workInProgress.contextTypes;
  if (types === null) {
    // TODO When does this happen?
    return null;
  }

  // TODO Is the null check needed?
  const fullContext = workInProgress.fullContext ?? emptyContext;
  const context: Record<string, unknown> = {};
  for (const type of types) {
    context[type] = fullContext[type];
  }
  return context;
}

export function compareContext(
  current: NanoFiber,
  workInProgress: NanoFiber,
): boolean {
  const types = workInProgress.contextTypes;
  if (types === null) {
    // TODO When does this happen?
    return true;
  }

  // TODO Is the null check needed?
  const oldContext = current.fullContext ?? emptyContext;
  const newContext = workInProgress.fullContext ?? emptyContext;
  for (const type of types) {
    if (oldContext[type] !== newContext[type]) {
      return false;
    }
  }
  return true;
}

export function getContextKey<T>(context: NanoContext<T>): NanoContextKey {
  // @ts-expect-error Marker is always set
  return context[contextKeyMarker];
}

export function getContextName<T>(context: NanoContext<T>): string {
  // @ts-expect-error Marker is always set
  return context[contextNameMarker];
}
