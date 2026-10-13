import type {
  CallbackHook,
  ContextHook,
  EffectCleanup,
  EffectCreator,
  EffectHook,
  EventDispatcherHook,
  MemoHook,
  ReducerHook,
  RefHook,
  StateHook,
  StyleSheetHook,
} from '../api/hook';
import { type StyleBundle, type StyleSheet } from '../api/style';
import { Fiber } from '../reconciler/fiber';
import { type AnyFunction, type ValueOf } from '../shared/type';

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

export type HookDispatcher = {
  useState: StateHook;
  useEffect: EffectHook;
  useLayoutEffect: EffectHook;
  useContext: ContextHook;
  useStyleSheet: StyleSheetHook;
  useReducer: ReducerHook;
  useRef: RefHook;
  useCallback: CallbackHook;
  useMemo: MemoHook;
  useEventDispatcher: EventDispatcherHook;
};

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
