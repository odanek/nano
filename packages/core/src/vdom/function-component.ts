import { AnyFunction, PlainObject } from '@nano-ui/type';
import { arrayEquals, objectEquals, objectHasOwnProperty } from '@nano-ui/util';
import { connectBundle, disconnectBundle } from '../style/manager';
import { NanoStyleSheet } from '../style/style';
import {
  compareContext,
  getContextKey,
  getContextName,
  NanoContext,
  NanoContextKey,
  readContext,
} from './context';
import { NanoFiber } from './fiber';
import { NanoFiberRoot } from './fiber-root';
import {
  NanoEffectCreator,
  NanoHook,
  NanoHookDispatcher,
  NanoHookTag,
  NanoReducer,
  NanoEffectHookPayload,
  NanoReducerHookPayload,
  NanoCallbackHookPayload,
  NanoMemoHookPayload,
  NanoStyleSheetHookPayload,
} from './hook';
import { NanoRef } from './ref';
import { findFiberRoot } from './traversal';
import { NanoChildren, NanoComponent } from './type';
import { NanoEffectFlag, NanoEffectTag, pushPassiveEffect } from './effect';

type NanoFunctionComponentProps = PlainObject;

let workInProgressFiber: NanoFiber | null = null;
let workInProgressHook: NanoHook | null = null;
let currentHook: NanoHook | null = null;
let hookDispatcher: NanoHookDispatcher | null = null;

const mountDispatcher: NanoHookDispatcher = {
  useState: mountState,
  useEffect: mountEffect,
  useLayoutEffect: mountLayoutEffect,
  useContext: mountContext,
  useStyleSheet: mountStyleSheet,
  useReducer: mountReducer,
  useRef: mountRef,
  useCallback: mountCallback,
  useMemo: mountMemo,
};

const updateDispatcher: NanoHookDispatcher = {
  useState: updateState,
  useEffect: updateEffect,
  useLayoutEffect: updateLayoutEffect,
  useContext: updateContext,
  useStyleSheet: updateStyleSheet,
  useReducer: updateReducer,
  useRef: updateRef,
  useCallback: updateCallback,
  useMemo: updateMemo,
};

function scheduleUpdateOnFiber(fiber: NanoFiber): void {
  const rootFiber = findFiberRoot(fiber);
  if (!rootFiber) {
    return;
  }

  const root = rootFiber.stateNode as NanoFiberRoot;
  if (
    !root.disposed &&
    (root.workInProgress === null || rootFiber === root.workInProgress)
  ) {
    root.scheduleUpdate();
  }
}

export function renderFunctionComponent(
  current: NanoFiber | null,
  workInProgress: NanoFiber,
): NanoChildren {
  workInProgressFiber = workInProgress;
  hookDispatcher = current === null ? mountDispatcher : updateDispatcher;

  const Component = workInProgress.type as NanoComponent;
  const props = workInProgress.pendingProps;
  const children = Component(props);
  if (current === null) {
    workInProgress.memoizedContext = readContext(workInProgress);
  }

  workInProgressFiber = null;
  currentHook = null;
  workInProgressHook = null;
  hookDispatcher = null;

  return children;
}

export function updateFunctionComponent(
  current: NanoFiber,
  workInProgress: NanoFiber,
): boolean {
  const hasContextUpdate = !compareContext(current, workInProgress);
  if (hasContextUpdate) {
    workInProgress.memoizedContext = readContext(workInProgress);
    return true;
  } else {
    workInProgress.memoizedContext = current.memoizedContext;
  }

  const oldProps = current.memoizedProps as NanoFunctionComponentProps;
  const newProps = workInProgress.pendingProps as NanoFunctionComponentProps;
  if (!objectEquals(oldProps, newProps)) {
    return true;
  }

  for (
    let hook = current.memoizedState as NanoHook | null;
    hook !== null;
    hook = hook.next
  ) {
    if (hook.tag === NanoHookTag.Reducer) {
      const payload = hook.payload as NanoReducerHookPayload;
      if (payload.dirty) {
        return true;
      }
    }
  }

  return false;
}

export function mountStyleEffects(
  current: NanoFiber | null,
  finishedWork: NanoFiber | null,
): void {
  let currentHook = (current?.memoizedState ?? null) as NanoHook | null;
  let finishedWorkHook = (finishedWork?.memoizedState ??
    null) as NanoHook | null;

  while (currentHook !== null || finishedWorkHook !== null) {
    if (currentHook?.tag === NanoHookTag.Style) {
      const payload =
        currentHook.payload as NanoStyleSheetHookPayload<NanoStyleSheet>;
      if (finishedWorkHook == null) {
        disconnectBundle(payload.styleSheet);
      } else {
        const finishedWorkPayload =
          finishedWorkHook.payload as NanoStyleSheetHookPayload<NanoStyleSheet>;
        if (finishedWorkPayload.styleSheet !== payload.styleSheet) {
          disconnectBundle(payload.styleSheet);
          connectBundle(finishedWorkPayload.styleSheet);
        }
      }
    } else if (finishedWorkHook?.tag === NanoHookTag.Style) {
      const payload =
        finishedWorkHook.payload as NanoStyleSheetHookPayload<NanoStyleSheet>;
      connectBundle(payload.styleSheet);
    }

    currentHook = currentHook?.next ?? null;
    finishedWorkHook = finishedWorkHook?.next ?? null;
  }
}

function mountWorkInProgressHook(tag: NanoHookTag): NanoHook {
  const hook = new NanoHook(tag);

  if (workInProgressHook === null) {
    (workInProgressFiber as NanoFiber).memoizedState = hook;
  } else {
    workInProgressHook.next = hook;
  }
  workInProgressHook = hook;

  return hook;
}

function updateWorkInProgressHook(tag: NanoHookTag): NanoHook {
  if (currentHook === null) {
    const current = (workInProgressFiber as NanoFiber).alternate as NanoFiber;
    currentHook = current.memoizedState as NanoHook;
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
  payload: NanoReducerHookPayload<T, A>,
  reducer: NanoReducer<T, A>,
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
  create: NanoEffectCreator,
  deps: unknown[] | undefined,
  flags: number,
): NanoEffectHookPayload {
  return {
    create,
    destroy: undefined,
    flags,
    deps,
  };
}

function createReducerPayload<T, A>(
  reducer: NanoReducer<T, A>,
  initialState: T,
): NanoReducerHookPayload<T, A> {
  const payload = {
    memoizedState: initialState,
    nextState: null,
    dirty: false,
    dispatch: (action: A): void => dispatchReducer(payload, reducer, action),
    fiber: workInProgressFiber as NanoFiber,
  };
  return payload;
}

function createCallbackPayload<T extends AnyFunction>(
  callback: T,
  deps?: unknown[],
): NanoCallbackHookPayload<T> {
  return {
    callback,
    deps,
  };
}

function createMemoPayload<T>(
  create: () => T,
  deps?: unknown[],
): NanoMemoHookPayload<T> {
  return {
    value: create(),
    deps,
  };
}

function createStyleSheetPayload<S extends NanoStyleSheet>(
  styleSheet: S,
): NanoStyleSheetHookPayload<S> {
  const bundle = {} as Record<keyof S, string>;
  for (const [key, value] of Object.entries(styleSheet)) {
    bundle[key as keyof S] = value.id;
  }

  return {
    styleSheet,
    bundle,
  };
}

function addContextType(fiber: NanoFiber, key: NanoContextKey): void {
  const contextTypes = fiber.contextTypes ?? [];
  fiber.contextTypes = contextTypes;

  if (!contextTypes.includes(key)) {
    contextTypes.push(key);
  }
}

function mountState<T>(initialState: T): [T, (value: T) => void] {
  return mountReducer(stateReducer, initialState);
}

function mountEffect(create: NanoEffectCreator, deps?: unknown[]): void {
  const hook = mountWorkInProgressHook(NanoHookTag.Effect);
  const payload = createEffectPayload(
    create,
    deps,
    NanoEffectFlag.Create | NanoEffectFlag.Passive,
  );
  hook.payload = payload;
  pushPassiveEffect(payload);
}

function mountLayoutEffect(create: NanoEffectCreator, deps?: unknown[]): void {
  const hook = mountWorkInProgressHook(NanoHookTag.Effect);
  hook.payload = createEffectPayload(create, deps, NanoEffectFlag.Create);
  (workInProgressFiber as NanoFiber).effectTag |= NanoEffectTag.Effect;
}

function mountContext<T>(context: NanoContext<T>): T {
  mountWorkInProgressHook(NanoHookTag.Context);
  const key = getContextKey(context);
  addContextType(workInProgressFiber as NanoFiber, key);
  const fullContext = (workInProgressFiber as NanoFiber).fullContext;
  if (fullContext === null || !objectHasOwnProperty(fullContext, key)) {
    throw new Error(
      `Context value for context '${getContextName(context)}' not defined`,
    );
  }
  return fullContext[key] as T;
}

function mountStyleSheet<S extends NanoStyleSheet>(
  styleSheet: S,
): Record<keyof S, string> {
  const hook = mountWorkInProgressHook(NanoHookTag.Style);
  const payload = createStyleSheetPayload(styleSheet);
  hook.payload = payload;
  (workInProgressFiber as NanoFiber).effectTag |= NanoEffectTag.Style;
  return payload.bundle;
}

function mountReducer<T, A>(
  reducer: NanoReducer<T, A>,
  initialState: T,
): [T, (action: A) => void] {
  const hook = mountWorkInProgressHook(NanoHookTag.Reducer);
  const payload = createReducerPayload(reducer, initialState);
  hook.payload = payload;
  return [initialState, payload.dispatch];
}

function mountRef<T>(initialValue: T): NanoRef<T> {
  const hook = mountWorkInProgressHook(NanoHookTag.Ref);
  const ref = new NanoRef(initialValue);
  hook.payload = ref;
  return ref;
}

function mountCallback<T extends AnyFunction>(
  callback: T,
  deps?: unknown[],
): T {
  const hook = mountWorkInProgressHook(NanoHookTag.Callback);
  const payload = createCallbackPayload(callback, deps);
  hook.payload = payload;
  return payload.callback;
}

function mountMemo<T>(create: () => T, deps?: unknown[]): T {
  const hook = mountWorkInProgressHook(NanoHookTag.Memo);
  const payload = createMemoPayload(create, deps);
  hook.payload = payload;
  return payload.value;
}

function updateState<T>(initialState: T): [T, (value: T) => void] {
  return updateReducer(stateReducer, initialState);
}

function updateEffect(create: NanoEffectCreator, deps?: unknown[]): void {
  const hook = updateWorkInProgressHook(NanoHookTag.Effect);
  const payload = hook.payload as NanoEffectHookPayload;
  // TODO Fix dep comparisons
  if (deps === undefined || !arrayEquals(payload.deps as unknown[], deps)) {
    payload.flags |= NanoEffectFlag.Destroy;
    pushPassiveEffect(payload);
    const updatedPayload = createEffectPayload(
      create,
      deps,
      NanoEffectFlag.Create | NanoEffectFlag.Passive,
    );
    hook.payload = updatedPayload;
    pushPassiveEffect(updatedPayload);
  }
}

function updateLayoutEffect(create: NanoEffectCreator, deps?: unknown[]): void {
  const hook = updateWorkInProgressHook(NanoHookTag.Effect);
  const payload = hook.payload as NanoEffectHookPayload;
  if (deps === undefined || !arrayEquals(payload.deps as unknown[], deps)) {
    hook.payload = createEffectPayload(create, deps, NanoEffectFlag.Create);
    (workInProgressFiber as NanoFiber).effectTag |= NanoEffectTag.Effect;
  }
}

function updateContext<T>(context: NanoContext<T>): T {
  updateWorkInProgressHook(NanoHookTag.Context);
  const key = getContextKey(context);
  const memoizedContext = (workInProgressFiber as NanoFiber).memoizedContext;
  if (memoizedContext === null || !objectHasOwnProperty(memoizedContext, key)) {
    throw new Error('Context value not defined');
  }
  return memoizedContext[key] as T;
}

function updateStyleSheet<S extends NanoStyleSheet>(
  styleSheet: S,
): Record<keyof S, string> {
  const hook = updateWorkInProgressHook(NanoHookTag.Style);
  let payload = hook.payload as NanoStyleSheetHookPayload<S>;
  if (payload.styleSheet !== styleSheet) {
    payload = createStyleSheetPayload(styleSheet);
    hook.payload = payload;
    (workInProgressFiber as NanoFiber).effectTag |= NanoEffectTag.Style;
  }
  return payload.bundle;
}

function updateReducer<T, A>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reducer: NanoReducer<T, A>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialState: T,
): [T, (action: A) => void] {
  const hook = updateWorkInProgressHook(NanoHookTag.Reducer);
  const payload = hook.payload as NanoReducerHookPayload;
  if (payload.dirty) {
    payload.memoizedState = payload.nextState;
    payload.nextState = null;
    payload.dirty = false;
  }
  payload.fiber = workInProgressFiber as NanoFiber;
  return [payload.memoizedState as T, payload.dispatch];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateRef<T>(initialValue: T): NanoRef<T> {
  const hook = updateWorkInProgressHook(NanoHookTag.Ref);
  return hook.payload as NanoRef<T>;
}

function updateCallback<T extends AnyFunction>(
  callback: T,
  deps?: unknown[],
): T {
  const hook = updateWorkInProgressHook(NanoHookTag.Callback);
  const payload = hook.payload as NanoCallbackHookPayload<T>;
  if (deps !== undefined && !arrayEquals(payload.deps as unknown[], deps)) {
    const updatedPayload = (hook.payload = createCallbackPayload(
      callback,
      deps,
    ));
    return updatedPayload.callback;
  } else {
    return payload.callback;
  }
}

function updateMemo<T>(create: () => T, deps?: unknown[]): T {
  const hook = updateWorkInProgressHook(NanoHookTag.Memo);
  const payload = hook.payload as NanoMemoHookPayload<T>;
  if (deps !== undefined && !arrayEquals(payload.deps as unknown[], deps)) {
    const newPayload = createMemoPayload(create, deps);
    hook.payload = newPayload;
    return newPayload.value;
  } else {
    return payload.value;
  }
}

export function useState<T>(initialState: T): [T, (value: T) => void] {
  return (hookDispatcher as NanoHookDispatcher).useState(initialState);
}

export function useEffect(create: NanoEffectCreator, deps?: unknown[]): void {
  (hookDispatcher as NanoHookDispatcher).useEffect(create, deps);
}

export function useLayoutEffect(
  create: NanoEffectCreator,
  deps?: unknown[],
): void {
  (hookDispatcher as NanoHookDispatcher).useLayoutEffect(create, deps);
}

export function useContext<T>(context: NanoContext<T>): T {
  return (hookDispatcher as NanoHookDispatcher).useContext(context);
}

export function useStyleSheet<S extends NanoStyleSheet>(
  styleSheet: S,
): Record<keyof S, string> {
  return (hookDispatcher as NanoHookDispatcher).useStyleSheet(styleSheet);
}

export function useReducer<T, A>(
  reducer: NanoReducer<T, A>,
  initialState: T,
): [T, (action: A) => void] {
  return (hookDispatcher as NanoHookDispatcher).useReducer(
    reducer,
    initialState,
  );
}

export function useRef<T>(initialValue: T): NanoRef<T> {
  return (hookDispatcher as NanoHookDispatcher).useRef(initialValue);
}

export function useCallback<T extends AnyFunction>(
  callback: T,
  deps?: unknown[],
): T {
  return (hookDispatcher as NanoHookDispatcher).useCallback(callback, deps);
}

export function useMemo<T>(create: () => T, deps?: unknown[]): T {
  return (hookDispatcher as NanoHookDispatcher).useMemo(create, deps);
}
