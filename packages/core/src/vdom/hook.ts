import { Counter } from '@nano-ui/util';
import { NanoContext } from './context';
import { NanoStyleSheet } from '../style/style';
import { NanoRef } from './ref';
import { AnyFunction } from '@nano-ui/type';
import { NanoFiber } from './fiber';

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

const hookTagCounter = new Counter();
export enum NanoHookTag {
  Effect = hookTagCounter.next(),
  Context = hookTagCounter.next(),
  Style = hookTagCounter.next(),
  Reducer = hookTagCounter.next(),
  Ref = hookTagCounter.next(),
  Callback = hookTagCounter.next(),
  Memo = hookTagCounter.next(),
}

export type NanoReducer<T, A> = (state: T, action: A) => T;
export type NanoEffectCleanup = () => void;
export type NanoEffectCreator = () => NanoEffectCleanup | undefined;

export type NanoStateHook = <T>(initialState: T) => [T, (value: T) => void];
export type NanoEffectHook = (
  create: NanoEffectCreator,
  deps?: unknown[],
) => void;
export type NanoContextHook = <T>(context: NanoContext<T>) => T;
export type NanoStyleSheetHook = <S extends NanoStyleSheet>(
  styleSheet: S,
) => Record<keyof S, string>;
export type NanoReducerHook = <T, A>(
  reducer: NanoReducer<T, A>,
  initialState: T,
) => [T, (action: A) => void];
export type NanoRefHook = <T>(initialValue: T) => NanoRef<T>;
export type NanoCallbackHook = <T extends AnyFunction>(
  callback: T,
  deps?: unknown[],
) => T;
export type NanoMemoHook = <T>(create: () => T, deps?: unknown[]) => T;

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
  destroy: NanoEffectCleanup | undefined;
  flags: number;
  deps: unknown[] | undefined;
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
  deps: unknown[] | undefined;
};

export type NanoMemoHookPayload<T> = {
  value: T;
  deps: unknown[] | undefined;
};

export type NanoStyleSheetHookPayload<S extends NanoStyleSheet> = {
  styleSheet: S;
  bundle: Record<keyof S, string>;
};
