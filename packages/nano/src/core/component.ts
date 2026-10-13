import { connectBundle, disconnectBundle } from '../style/manager';
import { type StyleBundle, type StyleSheet } from '../api/style';
import { Fiber } from '../reconciler/fiber';
import { RootImpl } from './root';
import type { EffectCreator, Reducer } from '../api/hook';
import {
  Hook,
  type HookDispatcher,
  HookTag,
  type EffectHookPayload,
  type ReducerHookPayload,
  type CallbackHookPayload,
  type MemoHookPayload,
  type StyleSheetHookPayload,
  type HookTagValue,
} from '../hooks/hook';
import { findFiberRoot } from './traversal';
import { EffectFlag, EffectTag, pushPassiveEffect } from '../hooks/effect';
import { objectEquals, objectHasOwnProperty } from '../shared/object';
import { arrayEquals } from '../shared/array';
import type { AnyFunction, PlainObject } from '../shared/type';
import type { EventDispatcher } from '../dom/dispatcher';
import type { Component, Renderable } from '../api/renderable';
import { type Context } from '../api/context';
import {
  compareContext,
  getContextKey,
  getContextName,
  type ContextKey,
} from './context';
import { type Ref } from '../api/ref';
import { createRef } from './ref';

type NanoFunctionComponentProps = PlainObject;

let workInProgressFiber: Fiber | null = null;
let workInProgressHook: Hook | null = null;
let currentHook: Hook | null = null;
let hookDispatcher: HookDispatcher | null = null;

const mountDispatcher: HookDispatcher = {
  useState: mountState,
  useEffect: mountEffect,
  useLayoutEffect: mountLayoutEffect,
  useContext: mountContext,
  useStyleSheet: mountStyleSheet,
  useReducer: mountReducer,
  useRef: mountRef,
  useCallback: mountCallback,
  useMemo: mountMemo,
  useEventDispatcher: mountEventDispatcher,
};

const updateDispatcher: HookDispatcher = {
  useState: updateState,
  useEffect: updateEffect,
  useLayoutEffect: updateLayoutEffect,
  useContext: updateContext,
  useStyleSheet: updateStyleSheet,
  useReducer: updateReducer,
  useRef: updateRef,
  useCallback: updateCallback,
  useMemo: updateMemo,
  useEventDispatcher: mountEventDispatcher,
};

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

export function renderFunctionComponent(
  current: Fiber | null,
  workInProgress: Fiber,
): Renderable {
  workInProgressFiber = workInProgress;
  hookDispatcher = current === null ? mountDispatcher : updateDispatcher;

  const Component = workInProgress.type as Component;
  const props = workInProgress.pendingProps;
  const children = Component(props);

  workInProgressFiber = null;
  currentHook = null;
  workInProgressHook = null;
  hookDispatcher = null;

  return children;
}

export function updateFunctionComponent(
  current: Fiber,
  workInProgress: Fiber,
): boolean {
  const hasContextUpdate = !compareContext(current, workInProgress);
  if (hasContextUpdate) {
    return true;
  }

  const oldProps = current.memoizedProps as NanoFunctionComponentProps;
  const newProps = workInProgress.pendingProps as NanoFunctionComponentProps;
  if (!objectEquals(oldProps, newProps)) {
    return true;
  }

  for (
    let hook = current.memoizedState as Hook | null;
    hook !== null;
    hook = hook.next
  ) {
    if (hook.tag === HookTag.Reducer) {
      const payload = hook.payload as ReducerHookPayload;
      if (payload.dirty) {
        return true;
      }
    }
  }

  return false;
}

export function runStyleEffects(
  current: Fiber | null,
  finishedWork: Fiber | null,
): void {
  let currentHook = (current?.memoizedState ?? null) as Hook | null;
  let finishedWorkHook = (finishedWork?.memoizedState ?? null) as Hook | null;

  while (currentHook !== null || finishedWorkHook !== null) {
    if (currentHook?.tag === HookTag.Style) {
      const payload = currentHook.payload as StyleSheetHookPayload<StyleBundle>;
      if (finishedWorkHook === null) {
        disconnectBundle(payload.bundle);
      } else {
        const finishedWorkPayload =
          finishedWorkHook.payload as StyleSheetHookPayload<StyleBundle>;
        if (finishedWorkPayload.bundle !== payload.bundle) {
          disconnectBundle(payload.bundle);
          connectBundle(finishedWorkPayload.bundle);
        }
      }
    } else if (finishedWorkHook?.tag === HookTag.Style) {
      const payload =
        finishedWorkHook.payload as StyleSheetHookPayload<StyleBundle>;
      connectBundle(payload.bundle);
    }

    currentHook = currentHook?.next ?? null;
    finishedWorkHook = finishedWorkHook?.next ?? null;
  }
}

function mountWorkInProgressHook(tag: HookTagValue): Hook {
  const hook = new Hook(tag);

  if (workInProgressHook === null) {
    (workInProgressFiber as Fiber).memoizedState = hook;
  } else {
    workInProgressHook.next = hook;
  }
  workInProgressHook = hook;

  return hook;
}

function updateWorkInProgressHook(tag: HookTagValue): Hook {
  if (currentHook === null) {
    const current = (workInProgressFiber as Fiber).alternate as Fiber;
    currentHook = current.memoizedState as Hook;
  } else {
    currentHook = currentHook.next;
  }

  if (currentHook === null) {
    throw new Error('Rendered more hooks than during the previous render');
  } else if (currentHook.tag !== tag) {
    throw new Error(
      'Hook type mismatch. Always render hooks in the same order.',
    );
  }

  const hook = mountWorkInProgressHook(tag);
  hook.payload = currentHook.payload;
  return hook;
}

function stateReducer<T>(currentState: T, value: T): T {
  return value;
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

function createEffectPayload(
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

function createReducerPayload<T, A>(
  reducer: Reducer<T, A>,
  initialState: T,
): ReducerHookPayload<T, A> {
  const payload = {
    memoizedState: initialState,
    nextState: null,
    dirty: false,
    dispatch: (action: A): void => dispatchReducer(payload, reducer, action),
    fiber: workInProgressFiber as Fiber,
  };
  return payload;
}

function createCallbackPayload<T extends AnyFunction>(
  callback: T,
  deps: readonly unknown[],
): CallbackHookPayload<T> {
  return {
    callback,
    deps,
  };
}

function createMemoPayload<T>(
  create: () => T,
  deps: readonly unknown[],
): MemoHookPayload<T> {
  return {
    value: create(),
    deps,
  };
}

function addContextType(fiber: Fiber, key: ContextKey): void {
  if (!fiber.contextTypes.includes(key)) {
    fiber.contextTypes = [...fiber.contextTypes, key];
  }
}

function mountState<T>(initialState: T): [T, (value: T) => void] {
  return mountReducer(stateReducer, initialState);
}

function mountEffect(create: EffectCreator, deps: readonly unknown[]): void {
  const hook = mountWorkInProgressHook(HookTag.Effect);
  const payload = createEffectPayload(
    create,
    deps,
    EffectFlag.Create | EffectFlag.Passive,
  );
  hook.payload = payload;
  pushPassiveEffect(payload);
}

function mountLayoutEffect(
  create: EffectCreator,
  deps: readonly unknown[],
): void {
  const hook = mountWorkInProgressHook(HookTag.Effect);
  hook.payload = createEffectPayload(create, deps, EffectFlag.Create);
  (workInProgressFiber as Fiber).effectTag |= EffectTag.Effect;
}

function mountContext<T>(context: Context<T>): T {
  mountWorkInProgressHook(HookTag.Context);
  const key = getContextKey(context);
  addContextType(workInProgressFiber as Fiber, key);
  const fullContext = (workInProgressFiber as Fiber).fullContext;
  if (!objectHasOwnProperty(fullContext, key)) {
    throw new Error(
      `Context value for context '${getContextName(context)}' not defined`,
    );
  }
  return fullContext[key] as T;
}

function mountStyleSheet<S extends StyleBundle>(
  styleSheet: StyleSheet<S>,
): Record<keyof S, string> {
  const hook = mountWorkInProgressHook(HookTag.Style);
  const payload = styleSheet;
  hook.payload = payload;
  (workInProgressFiber as Fiber).effectTag |= EffectTag.Style;
  return payload.classNames;
}

function mountReducer<T, A>(
  reducer: Reducer<T, A>,
  initialState: T,
): [T, (action: A) => void] {
  const hook = mountWorkInProgressHook(HookTag.Reducer);
  const payload = createReducerPayload(reducer, initialState);
  hook.payload = payload;
  return [initialState, payload.dispatch];
}

function mountRef<T>(initialValue: T): Ref<T> {
  const hook = mountWorkInProgressHook(HookTag.Ref);
  const ref = createRef(initialValue);
  hook.payload = ref;
  return ref;
}

function mountCallback<T extends AnyFunction>(
  callback: T,
  deps: readonly unknown[],
): T {
  const hook = mountWorkInProgressHook(HookTag.Callback);
  const payload = createCallbackPayload(callback, deps);
  hook.payload = payload;
  return payload.callback;
}

function mountMemo<T>(create: () => T, deps: readonly unknown[]): T {
  const hook = mountWorkInProgressHook(HookTag.Memo);
  const payload = createMemoPayload(create, deps);
  hook.payload = payload;
  return payload.value;
}

function mountEventDispatcher(): EventDispatcher {
  const rootFiber = findFiberRoot(workInProgressFiber as Fiber);
  const root = rootFiber.stateNode as RootImpl;
  return root.dispatcher;
}

function updateState<T>(initialState: T): [T, (value: T) => void] {
  return updateReducer(stateReducer, initialState);
}

function updateEffect(create: EffectCreator, deps: readonly unknown[]): void {
  const hook = updateWorkInProgressHook(HookTag.Effect);
  const payload = hook.payload as EffectHookPayload;
  if (!arrayEquals(payload.deps, deps)) {
    payload.flags |= EffectFlag.Destroy;
    pushPassiveEffect(payload);
    const updatedPayload = createEffectPayload(
      create,
      deps,
      EffectFlag.Create | EffectFlag.Passive,
    );
    hook.payload = updatedPayload;
    pushPassiveEffect(updatedPayload);
  }
}

function updateLayoutEffect(
  create: EffectCreator,
  deps: readonly unknown[],
): void {
  const hook = updateWorkInProgressHook(HookTag.Effect);
  const payload = hook.payload as EffectHookPayload;
  if (!arrayEquals(payload.deps, deps)) {
    hook.payload = createEffectPayload(create, deps, EffectFlag.Create);
    (workInProgressFiber as Fiber).effectTag |= EffectTag.Effect;
  }
}

function updateContext<T>(context: Context<T>): T {
  updateWorkInProgressHook(HookTag.Context);
  const key = getContextKey(context);
  const fullContext = (workInProgressFiber as Fiber).fullContext;
  if (!objectHasOwnProperty(fullContext, key)) {
    throw new Error('Context value not defined');
  }
  return fullContext[key] as T;
}

function updateStyleSheet<S extends StyleBundle>(
  styleSheet: StyleSheet<S>,
): Record<keyof S, string> {
  const hook = updateWorkInProgressHook(HookTag.Style);
  let payload = hook.payload as StyleSheetHookPayload<S>;
  if (payload !== styleSheet) {
    payload = styleSheet;
    hook.payload = payload;
    (workInProgressFiber as Fiber).effectTag |= EffectTag.Style;
  }
  return payload.classNames;
}

function updateReducer<T, A>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reducer: Reducer<T, A>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialState: T,
): [T, (action: A) => void] {
  const hook = updateWorkInProgressHook(HookTag.Reducer);
  const payload = hook.payload as ReducerHookPayload;
  if (payload.dirty) {
    payload.memoizedState = payload.nextState;
    payload.nextState = null;
    payload.dirty = false;
  }
  payload.fiber = workInProgressFiber as Fiber;
  return [payload.memoizedState as T, payload.dispatch];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateRef<T>(initialValue: T): Ref<T> {
  const hook = updateWorkInProgressHook(HookTag.Ref);
  return hook.payload as Ref<T>;
}

function updateCallback<T extends AnyFunction>(
  callback: T,
  deps: readonly unknown[],
): T {
  const hook = updateWorkInProgressHook(HookTag.Callback);
  const payload = hook.payload as CallbackHookPayload<T>;
  if (!arrayEquals(payload.deps, deps)) {
    const updatedPayload = (hook.payload = createCallbackPayload(
      callback,
      deps,
    ));
    return updatedPayload.callback;
  } else {
    return payload.callback;
  }
}

function updateMemo<T>(create: () => T, deps: readonly unknown[]): T {
  const hook = updateWorkInProgressHook(HookTag.Memo);
  const payload = hook.payload as MemoHookPayload<T>;
  if (!arrayEquals(payload.deps, deps)) {
    const newPayload = createMemoPayload(create, deps);
    hook.payload = newPayload;
    return newPayload.value;
  } else {
    return payload.value;
  }
}

export function useState<T>(initialState: T): [T, (value: T) => void] {
  return (hookDispatcher as HookDispatcher).useState(initialState);
}

export function useEffect(
  create: EffectCreator,
  deps: readonly unknown[],
): void {
  (hookDispatcher as HookDispatcher).useEffect(create, deps);
}

export function useLayoutEffect(
  create: EffectCreator,
  deps: readonly unknown[],
): void {
  (hookDispatcher as HookDispatcher).useLayoutEffect(create, deps);
}

export function useContext<T>(context: Context<T>): T {
  return (hookDispatcher as HookDispatcher).useContext(context);
}

export function useStyleSheet<S extends StyleBundle>(
  styleSheet: StyleSheet<S>,
): Record<keyof S, string> {
  return (hookDispatcher as HookDispatcher).useStyleSheet(styleSheet);
}

export function useReducer<T, A>(
  reducer: Reducer<T, A>,
  initialState: T,
): [T, (action: A) => void] {
  return (hookDispatcher as HookDispatcher).useReducer(reducer, initialState);
}

export function useRef<T>(initialValue: T): Ref<T> {
  return (hookDispatcher as HookDispatcher).useRef(initialValue);
}

export function useCallback<T extends AnyFunction>(
  callback: T,
  deps: readonly unknown[],
): T {
  return (hookDispatcher as HookDispatcher).useCallback(callback, deps);
}

export function useMemo<T>(create: () => T, deps: readonly unknown[]): T {
  return (hookDispatcher as HookDispatcher).useMemo(create, deps);
}

export function useEventDispatcher(): EventDispatcher {
  return (hookDispatcher as HookDispatcher).useEventDispatcher();
}
