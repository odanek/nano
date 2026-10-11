import { type NanoStyleBundle, type NanoStyleSheet } from '../style/style';
import { Fiber } from '../reconciler/fiber';
import { type AnyFunction, type ValueOf } from '../shared/type';
import type { EventDispatcher } from '../dom/dispatcher';
import type { Context } from '../core/context';
import type { Ref } from '../core/ref';

export class Hook<P = unknown> {
  public tag: HookTagValue;
  public next: Hook | null;
  public payload: P | null;

  constructor(tag: HookTagValue) {
    this.tag = tag;
    this.next = null;
    this.payload = null;
  }
}

export const HookTag = {
  Effect: 1,
  Context: 2,
  Style: 3,
  Reducer: 4,
  Ref: 5,
  Callback: 6,
  Memo: 7,
};
export type HookTagValue = ValueOf<typeof HookTag>;

export type NanoReducer<T, A> = (state: T, action: A) => T;
export type NanoEffectCleanup = () => void;
export type NanoEffectCreator = () => NanoEffectCleanup | void;

export type NanoStateHook = <T>(initialState: T) => [T, (value: T) => void];
export type NanoEffectHook = (
  create: NanoEffectCreator,
  deps: readonly unknown[],
) => void;
export type NanoContextHook = <T>(context: Context<T>) => T;
export type NanoStyleSheetHook = <S extends NanoStyleBundle>(
  styleSheet: NanoStyleSheet<S>,
) => Record<keyof S, string>;
export type NanoReducerHook = <T, A>(
  reducer: NanoReducer<T, A>,
  initialState: T,
) => [T, (action: A) => void];
export type NanoRefHook = <T>(initialValue: T) => Ref<T>;
export type NanoCallbackHook = <T extends AnyFunction>(
  callback: T,
  deps: readonly unknown[],
) => T;
export type NanoMemoHook = <T>(create: () => T, deps: readonly unknown[]) => T;
export type NanoEventDispatcherHook = () => EventDispatcher;

export type NanoHookDispatcher = {
  useState: NanoStateHook;
  useEffect: NanoEffectHook;
  useLayoutEffect: NanoEffectHook;
  useContext: NanoContextHook;
  useStyleSheet: NanoStyleSheetHook;
  useReducer: NanoReducerHook;
  useRef: NanoRefHook;
  useCallback: NanoCallbackHook;
  useMemo: NanoMemoHook;
  useEventDispatcher: NanoEventDispatcherHook;
};

export type EffectHookPayload = {
  create: NanoEffectCreator;
  destroy: NanoEffectCleanup | void;
  flags: number;
  deps: readonly unknown[];
};

export type NanoReducerHookPayload<T = unknown, A = unknown> = {
  memoizedState: T;
  nextState: T | null;
  dirty: boolean;
  dispatch: (action: A) => void;
  fiber: Fiber;
};

export type NanoCallbackHookPayload<T extends AnyFunction> = {
  callback: T;
  deps: readonly unknown[];
};

export type NanoMemoHookPayload<T> = {
  value: T;
  deps: readonly unknown[];
};

export type NanoStyleSheetHookPayload<S extends NanoStyleBundle> =
  NanoStyleSheet<S>;
