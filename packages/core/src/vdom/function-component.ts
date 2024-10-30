import { arrayEquals, objectEquals } from '@nano-ui/util';
import { connectBundle, disconnectBundle } from '../style/manager';
import { StyleBundle, StyleProvider } from '../style/style';
import { compareContext, NanoContext, readContext } from './context';
import { NanoFiber } from './fiber';
import { NanoFiberRoot } from './fiber-root';
import { NanoEffectCreator, NanoHook, NanoHookDispatcher, NanoHookTag, NanoReducer, NanoEffectHookPayload, NanoReducerHookPayload } from './hook';
import { NanoRef } from './ref';
import { findFiberRoot } from './traversal';
import { NanoComponent, NanoEffectTag } from './type';
import { AnyFunction, isValue, PlainObject } from '@nano-ui/type';

type NanoFunctionComponentProps = PlainObject;
type NanoHookVisitCallback = (currentHook: NanoHook | null, finishedWorkHook: NanoHook | null) => void;

const emptyArray = Object.freeze([]);
let workInProgressFiber: NanoFiber | null = null;
let workInProgressHook: NanoHook | null = null;
let currentHook: NanoHook | null = null;
let hookDispatcher: NanoHookDispatcher | null = null;

const mountDispatcher: NanoHookDispatcher = {
	useState: mountState,
	useLayoutEffect: mountLayoutEffect,
	useContext: mountContext,
	useStyle: mountStyle,
	useReducer: mountReducer,
	useRef: mountRef,
	useCallback: mountCallback,
	useMemo: mountMemo
};

const updateDispatcher: NanoHookDispatcher = {
	useState: updateState,
	useLayoutEffect: updateLayoutEffect,
	useContext: updateContext,
	useStyle: updateStyle,
	useReducer: updateReducer,
	useRef: updateRef,
	useCallback: updateCallback,
	useMemo: updateMemo
};

function scheduleUpdateOnFiber(fiber: NanoFiber) {
	const rootFiber = findFiberRoot(fiber);
	if (!rootFiber) {
		return;
	}

	const root = rootFiber.stateNode as NanoFiberRoot;
	if (!root.disposed && (root.workInProgress === null || rootFiber === root.workInProgress)) {
		root.scheduleUpdate();
	}
}

export function renderFunctionComponent(current: NanoFiber | null, workInProgress: NanoFiber) {
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

export function updateFunctionComponent(current: NanoFiber, workInProgress: NanoFiber) {
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

	for (let hook = current.memoizedState as NanoHook | null; hook !== null; hook = hook.next) {
		if (hook.tag === NanoHookTag.Reducer) {
			const payload =  hook.payload as NanoReducerHookPayload;
			if (payload.dirty) {
				return true;
			}			
		}
	}

	return false;
}

export function mountLifecycleEffects(current: NanoFiber | null, finishedWork: NanoFiber) {
	visitHooks(current, finishedWork, (currentHook, finishedWorkHook) => {
		if (finishedWorkHook !== null && finishedWorkHook.tag === NanoHookTag.LayoutEffect) {
			const payload = finishedWorkHook.payload as NanoEffectHookPayload;
			if (currentHook === null || currentHook.payload !== payload) {
				payload.destroy = payload.create();
			}
		}
	});
}

export function unmountLifecycleEffects(current: NanoFiber | null, finishedWork: NanoFiber | null) {
	visitHooks(current, finishedWork, (currentHook, finishedWorkHook) => {
		if (currentHook !== null && currentHook.tag === NanoHookTag.LayoutEffect) {
			const payload = currentHook.payload as NanoEffectHookPayload;
			if ((finishedWorkHook === null || finishedWorkHook.payload !== payload) && payload.destroy !== undefined) {
				payload.destroy();
			}
		}
	});
}

export function mountStyleEffects(current: NanoFiber | null, finishedWork: NanoFiber | null) {
	visitHooks(current, finishedWork, (currentHook, finishedWorkHook) => {
		if (currentHook !== null && currentHook.tag === NanoHookTag.Style) {
			const payload = currentHook.payload;
			if (finishedWorkHook == null) {				
				disconnectBundle(payload);
			} else if (finishedWorkHook.payload !== payload) {				
				disconnectBundle(payload);
				connectBundle(finishedWorkHook.payload);
			}
		} else if (finishedWorkHook !== null && finishedWorkHook.tag === NanoHookTag.Style) {
			connectBundle(finishedWorkHook.payload);
		}
	});
}

function visitHooks(current: NanoFiber | null, finishedWork: NanoFiber | null, callback: NanoHookVisitCallback) {
	let currentHook = current === null ? null : (current.memoizedState as NanoHook | null);
	let finishedWorkHook = finishedWork === null ? null : (finishedWork.memoizedState as NanoHook | null);
	while (currentHook !== null || finishedWorkHook !== null) {
		callback(currentHook, finishedWorkHook);
		if (currentHook !== null) {
			currentHook = currentHook.next;
		}
		if (finishedWorkHook !== null) {
			finishedWorkHook = finishedWorkHook.next;
		}
	}
}

function mountWorkInProgressHook(tag: NanoHookTag) {
	const hook = new NanoHook(tag);

	if (workInProgressHook === null) {
		(workInProgressFiber as NanoFiber).memoizedState = hook;
	} else {
		workInProgressHook.next = hook;
	}
	workInProgressHook = hook;

	return hook;
}

function updateWorkInProgressHook(tag: NanoHookTag) {
	if (currentHook === null) {
		const current = (workInProgressFiber as NanoFiber).alternate as NanoFiber;
		currentHook = current.memoizedState as NanoHook;
	} else {
		currentHook = currentHook.next;
	}

	if (currentHook === null) {
		throw new Error('Rendered more hooks than during the previous render');
	} else if (currentHook.tag !== tag) {
		throw new Error('Hook type mismatch. Always render hooks in the same order.');
	}

	const hook = mountWorkInProgressHook(tag);
	hook.payload = currentHook.payload;
	return hook;
}

function stateReducer<T>(currentState: T, value: T): T {
	return value;
}

function dispatchReducer<T,A>(payload: NanoReducerHookPayload<T,A>, reducer: NanoReducer<T,A>, action: A) {
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

function createLayoutEffectPayload(create: NanoEffectCreator, deps?: unknown[]): NanoEffectHookPayload {
	return {
		create,
		destroy: undefined,
		deps
	};
}

function createReducerPayload<T,A>(reducer: NanoReducer<T,A>, initialState: T): NanoReducerHookPayload<T,A> {
	const payload = {
		memoizedState: initialState,
		nextState: null,
		dirty: false,
		dispatch: (action: A) => dispatchReducer(payload, reducer, action),
		fiber: workInProgressFiber as NanoFiber,
	};
	return payload;
}

function createCallbackPayload(callback: AnyFunction, deps?: unknown[]) {
	return {
		callback,
		deps
	};
}

function createMemoPayload<T>(create: () => T, deps?: unknown[]) {
	return {
		value: create(),
		deps
	};
}

function addContextType(fiber: NanoFiber, contextType) {
	let contextTypes = fiber.contextTypes;
	if (fiber.contextTypes === null) {
		contextTypes = [];
		fiber.contextTypes = contextTypes;
	}
	if (!contextTypes.includes(contextType)) {
		contextTypes.push(contextType);
	}
}

function mountState<T>(initialState: T): [T, (value: T) => void] {
	return mountReducer(stateReducer, initialState);
}

function mountLayoutEffect(create: NanoEffectCreator, deps?: unknown[]) {
	const hook = mountWorkInProgressHook(NanoHookTag.LayoutEffect);
	hook.payload = createLayoutEffectPayload(create, deps);
	workInProgressFiber.effectTag |= NanoEffectTag.Lifecycle;
}

function mountContext<T>(context: NanoContext<T>): T {
	mountWorkInProgressHook(NanoHookTag.Context);
	addContextType(workInProgressFiber, contextType);
	return workInProgressFiber.fullContext[contextType];
}

function mountStyle(bundle) {
	const hook = mountWorkInProgressHook(NanoHookTag.Style);	
	hook.payload = bundle;
	workInProgressFiber.effectTag |= NanoEffectTag.Update;
	return bundle.classNames;
}

function mountReducer<T,A>(reducer: NanoReducer<T,A>, initialState: T): [T, (action: A) => void] {
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

function mountCallback<T extends AnyFunction>(callback: T, deps?: unknown[]): T {
	const hook = mountWorkInProgressHook(NanoHookTag.Callback);
	const payload = hook.payload = createCallbackPayload(callback, deps);
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

function updateLayoutEffect(create: NanoEffectCreator, deps?: unknown[]) {
	const hook = updateWorkInProgressHook(NanoHookTag.LayoutEffect);
	if (deps === undefined || !arrayEquals(hook.payload.deps, deps)) {
		hook.payload = {
			create,
			destroy: null,
			deps
		};
		workInProgressFiber.effectTag |= NanoEffectTag.Lifecycle;
	}
}

function updateContext<T>(context: NanoContext<T>): T {
	updateWorkInProgressHook(NanoHookTag.Context);
	return workInProgressFiber.memoizedContext[contextType];
}

function updateStyle(bundle) {
	const hook = updateWorkInProgressHook(NanoHookTag.Style);	
	if (hook.payload !== bundle) {
		hook.payload = bundle;
		workInProgressFiber.effectTag |= NanoEffectTag.Update;
	}
	return bundle.classNames;
}

function updateReducer<T,A>(reducer: NanoReducer<T,A>, initialState: T): [T, (action: A) => void] {
	const hook = updateWorkInProgressHook(NanoHookTag.Reducer);
	const payload = hook.payload;
	if (payload.dirty) {
		payload.memoizedState = payload.nextState;
		payload.nextState = null;
		payload.dirty = false;
	}
	payload.fiber = workInProgressFiber;
	return [payload.memoizedState, payload.dispatch];
}

function updateRef<T>(initialValue: T): NanoRef<T> {
	const hook = updateWorkInProgressHook(NanoHookTag.Ref);
	return hook.payload as NanoRef<T>;
}

function updateCallback<T extends AnyFunction>(callback: T, deps?: unknown[]): T {
	const hook = updateWorkInProgressHook(NanoHookTag.Callback);
	const payload = hook.payload;
	if (deps !== undefined && !arrayEquals(payload.deps, deps)) {
		const updatedPayload = hook.payload = createCallbackPayload(callback, deps);
		return updatedPayload.callback;
	} else {
		return payload.callback;
	}
}

function updateMemo<T>(create: () => T, deps?: unknown[]): T {
	const hook = updateWorkInProgressHook(NanoHookTag.Memo);
	const payload = hook.payload;
	if (deps !== undefined && !arrayEquals(payload.deps, deps)) {
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

export function useLayoutEffect(create: NanoEffectCreator, deps?: unknown[]) {
	(hookDispatcher as NanoHookDispatcher).useLayoutEffect(create, deps);
}

export function useContext<T>(context: NanoContext<T>): T {
	return (hookDispatcher as NanoHookDispatcher).useContext(context);
}

export function useStyle<T extends StyleBundle>(create: StyleProvider<T>): T {
	return (hookDispatcher as NanoHookDispatcher).useStyle(create);
}

export function useReducer<T,A>(reducer: NanoReducer<T,A>, initialState: T): [T, (action: A) => void]  {
	return (hookDispatcher as NanoHookDispatcher).useReducer(reducer, initialState);
}

export function useRef<T>(initialValue: T): NanoRef<T> {
	return (hookDispatcher as NanoHookDispatcher).useRef(initialValue);
}

export function useCallback<T extends AnyFunction>(callback: T, deps?: unknown[]): T {
	return (hookDispatcher as NanoHookDispatcher).useCallback(callback, deps);
}

export function useMemo<T>(create: () => T, deps?: unknown[]): T {
	return (hookDispatcher as NanoHookDispatcher).useMemo(create, deps);
}
