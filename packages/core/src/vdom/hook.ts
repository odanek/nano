import { Counter } from "@nano-ui/util";
import { NanoContext } from "./context";
import { StyleBundle, StyleProvider } from "../style/style";
import { NanoRef } from "./ref";

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

export type NanoReducer<T, A> = (state: T, action: A) => void;
export type NanoEffectCreator = () => (() => void | void);

export type NanoUseStateHook = <T,>(initialState: T) => [T, (value: T) => void];
export type NanoUseLayoutEffectHook = (create: NanoEffectCreator, deps?: unknown[]) => void;
export type NanoUseContextHook = <T,>(context: NanoContext<T>) => T;
export type NanoUseStyleHook = <T extends StyleBundle,>(provider: StyleProvider<T>) => T;
export type NanoUseReducerHook = <T,A,>(reducer: NanoReducer<T, A>, initialState: T) => [T, (action: A) => void];
export type NanoUseRefHook = <T,>(initialValue: T) => NanoRef<T>;
export type NanoUseCallbackHook = <T extends (...args: unknown[]) => unknown>(callback: T, deps: unknown[]) => T;
export type NanoUseMemoHook = <T,>(create: () => T, deps: unknown[]) => T;

export type NanoHookDispatcher = {
	useState: NanoUseStateHook,
	useLayoutEffect: NanoUseLayoutEffectHook,
	useContext: NanoUseContextHook,
	useStyle: NanoUseStyleHook,
	useReducer: NanoUseReducerHook,
	useRef: NanoUseRefHook,
	useCallback: NanoUseCallbackHook,
	useMemo: NanoUseMemoHook
};