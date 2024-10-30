import { NanoFiber } from './fiber';
import { NanoComponent, NanoPropsWithChildren } from './type';

export type NanoContextKey = number;
export type NanoContext<T = unknown> = NanoComponent<
  NanoContextComponentProps<T>
>;
export type NanoContextComponentProps<T> = NanoPropsWithChildren<{ value: T }>;

let id = 1;
const contextMarker = Symbol('nano-context-marker');
export const emptyContext: Record<string, unknown> = Object.freeze({});

// TODO Specify context name?
export function createContext<T>(): NanoContext<T> {
  const Context = () => null;
  Context[contextMarker] = id++;
  return Context;
}

export function readContext(workInProgress: NanoFiber) {
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

export function compareContext(current: NanoFiber, workInProgress: NanoFiber) {
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