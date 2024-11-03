import { NanoFiber } from './fiber';
import { NanoComponent, NanoPropsWithChildren } from './type';

export type NanoContextKey = number;
export type NanoContext<T = unknown> = NanoComponent<NanoContextProps<T>>;
export type NanoContextProps<T = unknown> = NanoPropsWithChildren<{ value: T }>;

let id = 1;
const contextMarker = Symbol('nano-context-marker');
export const emptyContext: Record<string, unknown> = Object.freeze({});

// TODO Specify context name?
export function createContext<T>(): NanoContext<T> {
  const Context = (): null => null; // TODO: Return NanoElement.context() here so that no special casing is needed in jsx
  Context[contextMarker] = id++;
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
  return context[contextMarker];
}
