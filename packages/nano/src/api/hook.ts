import type { EventDispatcher } from '../dom/dispatcher';
import type { Context } from './context';
import type { Ref } from './ref';
import type { StyleBundle, StyleSheet } from './style';
import type { AnyFunction } from '../shared/type';

export type Reducer<T, A> = (state: T, action: A) => T;
export type EffectCleanup = () => void;
export type EffectCreator = () => EffectCleanup | void;

export type StateHook = <T>(initialState: T) => [T, (value: T) => void];
export type EffectHook = (
  create: EffectCreator,
  deps: readonly unknown[],
) => void;
export type ContextHook = <T>(context: Context<T>) => T;
export type StyleSheetHook = <S extends StyleBundle>(
  styleSheet: StyleSheet<S>,
) => Record<keyof S, string>;
export type ReducerHook = <T, A>(
  reducer: Reducer<T, A>,
  initialState: T,
) => [T, (action: A) => void];
export type RefHook = <T>(initialValue: T) => Ref<T>;
export type CallbackHook = <T extends AnyFunction>(
  callback: T,
  deps: readonly unknown[],
) => T;
export type MemoHook = <T>(create: () => T, deps: readonly unknown[]) => T;
export type EventDispatcherHook = () => EventDispatcher;
