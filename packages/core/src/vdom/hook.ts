import { Counter } from '@nano-ui/util';
import { NanoContext } from './context';
import { NanoStyleBundle, NanoStyleProvider } from '../style/style';
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
  LayoutEffect = hookTagCounter.next(),
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
export type NanoLayoutEffectHook = (
  create: NanoEffectCreator,
  deps?: unknown[],
) => void;
export type NanoContextHook = <T>(context: NanoContext<T>) => T;
export type NanoStyleHook = <T extends NanoStyleBundle>(
  provider: NanoStyleProvider<T>,
) => T;
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
  useLayoutEffect: NanoLayoutEffectHook;
  useContext: NanoContextHook;
  useStyle: NanoStyleHook;
  useReducer: NanoReducerHook;
  useRef: NanoRefHook;
  useCallback: NanoCallbackHook;
  useMemo: NanoMemoHook;
};

export type NanoEffectHookPayload = {
  create: NanoEffectCreator;
  destroy: NanoEffectCleanup | undefined;
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

export type NanoStyleHookPayload<T extends NanoStyleBundle = NanoStyleBundle> = {
  provider: NanoStyleProvider<T>;
  bundle: T;
};
