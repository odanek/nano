import type { EffectCleanup, EffectCreator, Reducer } from '../api/hook';
import type { StyleBundle, StyleSheet } from '../api/style';
import type { RootImpl } from '../core/root';
import { findFiberRoot } from '../core/traversal';
import type { Fiber } from '../reconciler/fiber';
import type { AnyFunction } from '../shared/type';

export type EffectHookPayload = {
  create: EffectCreator;
  destroy: EffectCleanup | void;
  flags: number;
  deps: readonly unknown[];
};

export type ReducerHookPayload<T = unknown, A = unknown> = {
  memoizedState: T;
  nextState: T | null;
  dirty: boolean;
  dispatch: (action: A) => void;
  fiber: Fiber;
};

export type CallbackHookPayload<T extends AnyFunction> = {
  callback: T;
  deps: readonly unknown[];
};

export type MemoHookPayload<T> = {
  value: T;
  deps: readonly unknown[];
};

export type StyleSheetHookPayload<S extends StyleBundle> = StyleSheet<S>;

export function createEffectPayload(
  create: EffectCreator,
  deps: readonly unknown[],
  flags: number,
): EffectHookPayload {
  return {
    create,
    destroy: undefined,
    flags,
    deps,
  };
}

export function createReducerPayload<T, A>(
  fiber: Fiber,
  reducer: Reducer<T, A>,
  initialState: T,
): ReducerHookPayload<T, A> {
  const payload = {
    memoizedState: initialState,
    nextState: null,
    dirty: false,
    dispatch: (action: A): void => dispatchReducer(payload, reducer, action),
    fiber,
  };
  return payload;
}

export function createCallbackPayload<T extends AnyFunction>(
  callback: T,
  deps: readonly unknown[],
): CallbackHookPayload<T> {
  return {
    callback,
    deps,
  };
}

export function createMemoPayload<T>(
  create: () => T,
  deps: readonly unknown[],
): MemoHookPayload<T> {
  return {
    value: create(),
    deps,
  };
}

function dispatchReducer<T, A>(
  payload: ReducerHookPayload<T, A>,
  reducer: Reducer<T, A>,
  action: A,
): void {
  const memoizedState = payload.memoizedState;
  const currentState = payload.dirty ? payload.nextState : memoizedState;
  const nextState = reducer(currentState as T, action);
  const dirty = nextState !== memoizedState;
  if (dirty) {
    payload.nextState = nextState;
    payload.dirty = true;
    scheduleUpdateOnFiber(payload.fiber);
  } else {
    payload.nextState = null;
    payload.dirty = false;
  }
}

function scheduleUpdateOnFiber(fiber: Fiber): void {
  const rootFiber = findFiberRoot(fiber);
  if (!rootFiber) {
    return;
  }

  const root = rootFiber.stateNode as RootImpl;
  if (
    root.mounted &&
    (root.workInProgress === null || rootFiber === root.workInProgress)
  ) {
    root.scheduleUpdate();
  }
}
