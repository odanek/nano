import { NanoContext } from './context';
import { NanoStyleBundle, NanoStyleSheet } from '../style/style';
import { NanoRef } from './ref';
import { NanoFiber } from './fiber';
import { AnyFunction } from '../util';

export class NanoHook<P = unknown> {
  public tag: NanoHookTag;
  public next: NanoHook | null;
  public payload: P | null;

  constructor(tag: NanoHookTag) {
    this.tag = tag;
    this.next = null;
    this.payload = null;
  }
}

export enum NanoHookTag {
  Effect,
  Context,
  Style,
  Reducer,
  Ref,
  Callback,
  Memo,
}

export type NanoReducer<T, A> = (state: T, action: A) => T;
export type NanoEffectCleanup = () => void;
export type NanoEffectCreator = () => NanoEffectCleanup | void;

export type NanoStateHook = <T>(initialState: T) => [T, (value: T) => void];
export type NanoEffectHook = (
  create: NanoEffectCreator,
  deps: readonly unknown[],
) => void;
export type NanoContextHook = <T>(context: NanoContext<T>) => T;
export type NanoStyleSheetHook = <S extends NanoStyleBundle>(
  styleSheet: NanoStyleSheet<S>,
) => Record<keyof S, string>;
export type NanoReducerHook = <T, A>(
  reducer: NanoReducer<T, A>,
  initialState: T,
) => [T, (action: A) => void];
export type NanoRefHook = <T>(initialValue: T) => NanoRef<T>;
export type NanoCallbackHook = <T extends AnyFunction>(
  callback: T,
  deps: readonly unknown[],
) => T;
export type NanoMemoHook = <T>(create: () => T, deps: readonly unknown[]) => T;

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
};

export type NanoEffectHookPayload = {
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
  fiber: NanoFiber;
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
