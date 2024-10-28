import { connectBundle, disconnectBundle } from '../style/manager';
import { compareContext, readContext } from './context';
import { NanoFiber } from './fiber';
import { NanoFiberRoot } from './fiber-root';
import { NanoHook, NanoHookTag } from './hook';
import { findFiberRoot } from './traversal';
import { NanoComponent } from './type';

type NanoHookVisitCallback = (currentHook: NanoHook | null, finishedWorkHook: NanoHook | null) => void;

const emptyArray = Object.freeze([]);
let workInProgressFiber: NanoFiber | null = null;
let workInProgressHook: NanoHook | null = null;
let currentHook: NanoHook | null = null;
let hookDispatcher = null;

const mountDispatcher = {
	useState: mountState,
	useLayoutEffect: mountLayoutEffect,
	useContext: mountContext,
	useStyle: mountStyle,
	useReducer: mountReducer,
	useRef: mountRef,
	useCallback: mountCallback,
	useMemo: mountMemo
};

const updateDispatcher = {
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

	const oldProps = current.memoizedProps;
	const newProps = workInProgress.pendingProps;
	if (!objectEquals(oldProps, newProps)) {
		return true;
	}

	for (let hook = current.memoizedState as NanoHook | null; hook !== null; hook = hook.next) {
		if (hook.tag === NanoHookTag.Reducer && hook.payload.dirty) {
			return true;
		}
	}

	return false;
}

export function mountLifecycleEffects(current: NanoFiber | null, finishedWork: NanoFiber) {
	visitHooks(current, finishedWork, (currentHook, finishedWorkHook) => {
		if (finishedWorkHook.tag === NanoHookTag.LayoutEffect) {
			const payload = finishedWorkHook.payload;
			if (currentHook === null || currentHook.payload !== payload) {
				const deps = payload.deps ?? emptyArray;
				payload.destroy = payload.create(...deps);
			}
		}
	});
}

export function unmountLifecycleEffects(current: NanoFiber | null, finishedWork: NanoFiber | null) {
	visitHooks(current, finishedWork, (currentHook, finishedWorkHook) => {
		if (currentHook.tag === NanoHookTag.LayoutEffect) {
			const payload = currentHook.payload;
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
		workInProgressFiber.memoizedState = hook;
	} else {
		workInProgressHook.next = hook;
	}
	workInProgressHook = hook;

	return hook;
}

function updateWorkInProgressHook(tag: NanoHook) {
	if (currentHook === null) {
		const current = workInProgressFiber.alternate;
		currentHook = current.memoizedState;
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

function stateReducer(currentState: unknown, value: unknown): unknown {
	return value;
}

function dispatchReducer(payload, reducer, action) {
	const memoizedState = payload.memoizedState;
	const currentState = payload.dirty ? payload.nextState : memoizedState;
	const nextState = reducer(currentState, action);
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

function createEffectPayload(create, deps) {
	return {
		create,
		destroy: undefined,
		deps
	};
}

function createCallbackPayload(callback, deps) {
	return {
		callback: isValue(deps) ? callback.bind(null, ...deps) : callback,
		deps
	};
}

function createMemoPayload(create, deps) {
	return {
		value: create(...(deps ?? emptyArray)),
		deps
	};
}

function addContextType(fiber, contextType) {
	let contextTypes = fiber.contextTypes;
	if (fiber.contextTypes === null) {
		contextTypes = [];
		fiber.contextTypes = contextTypes;
	}
	if (!contextTypes.includes(contextType)) {
		contextTypes.push(contextType);
	}
}

function mountState(initialState) {
	return mountReducer(stateReducer, initialState);
}

function mountLayoutEffect(create, deps) {
	const hook = mountWorkInProgressHook(layoutEffectHookTag);
	hook.payload = createEffectPayload(create, deps);
	workInProgressFiber.effectTag |= lifecycleEffectTag;
}

function mountContext(contextType) {
	mountWorkInProgressHook(contextHookTag);
	addContextType(workInProgressFiber, contextType);
	return workInProgressFiber.fullContext[contextType];
}

function mountStyle(bundle) {
	const hook = mountWorkInProgressHook(styleHookTag);	
	hook.payload = bundle;
	workInProgressFiber.effectTag |= updateEffectTag;
	return bundle.classNames;
}

function mountReducer(reducer, initialState) {
	const hook = mountWorkInProgressHook(reducerHookTag);
	const payload = {
		memoizedState: initialState,
		nextState: null,
		dirty: false,
		dispatch: (action) => dispatchReducer(payload, reducer, action),
		fiber: workInProgressFiber,
	};
	hook.payload = payload;
	return [initialState, payload.dispatch];
}

function mountRef(initialValue) {
	const hook = mountWorkInProgressHook(refHookTag);
	const ref = new Ref();
	ref.current = initialValue;
	hook.payload = ref;
	return ref;
}

function mountCallback(callback, deps) {
	const hook = mountWorkInProgressHook(callbackHookTag);
	const payload = hook.payload = createCallbackPayload(callback, deps);
	return payload.callback;
}

function mountMemo(create, deps) {
	const hook = mountWorkInProgressHook(memoHookTag);
	const payload = createMemoPayload(create, deps);
	hook.payload = payload;
	return payload.value;
}

function updateState(initialState) {
	return updateReducer(stateReducer, initialState);
}

function updateLayoutEffect(create, deps) {
	const hook = updateWorkInProgressHook(layoutEffectHookTag);
	if (deps === undefined || !arrayEquals(hook.payload.deps, deps)) {
		hook.payload = {
			create,
			destroy: null,
			deps
		};
		workInProgressFiber.effectTag |= lifecycleEffectTag;
	}
}

function updateContext(contextType) {
	updateWorkInProgressHook(contextHookTag);
	return workInProgressFiber.memoizedContext[contextType];
}

function updateStyle(bundle) {
	const hook = updateWorkInProgressHook(styleHookTag);	
	if (hook.payload !== bundle) {
		hook.payload = bundle;
		workInProgressFiber.effectTag |= updateEffectTag;
	}
	return bundle.classNames;
}

function updateReducer(reducer, initialState) {
	const hook = updateWorkInProgressHook(reducerHookTag);
	const payload = hook.payload;
	if (payload.dirty) {
		payload.memoizedState = payload.nextState;
		payload.nextState = null;
		payload.dirty = false;
	}
	payload.fiber = workInProgressFiber;
	return [payload.memoizedState, payload.dispatch];
}

function updateRef(initialValue) {
	const hook = updateWorkInProgressHook(refHookTag);
	const ref = hook.payload;
	return ref;
}

function updateCallback(callback, deps) {
	const hook = updateWorkInProgressHook(callbackHookTag);
	const payload = hook.payload;
	if (deps !== undefined && !arrayEquals(payload.deps, deps)) {
		const updatedPayload = hook.payload = createCallbackPayload(callback, deps);
		return updatedPayload.callback;
	} else {
		return payload.callback;
	}
}

function updateMemo(create, deps) {
	const hook = updateWorkInProgressHook(memoHookTag);
	const payload = hook.payload;
	if (deps !== undefined && !arrayEquals(payload.deps, deps)) {
		const newPayload = createMemoPayload(create, deps);
		hook.payload = newPayload;
		return newPayload.value;
	} else {
		return payload.value;
	}
}

export function useState<T>(initialState: T): T {
	return hookDispatcher.useState(initialState);
}

export function useLayoutEffect(create, deps) {
	return hookDispatcher.useLayoutEffect(create, deps);
}

export function useContext(contextType) {
	return hookDispatcher.useContext(contextType);
}

export function useStyle(create) {
	return hookDispatcher.useStyle(create);
}

export function useReducer(reducer, initialState) {
	return hookDispatcher.useReducer(reducer, initialState);
}

export function useRef(initialValue) {
	return hookDispatcher.useRef(initialValue);
}

export function useCallback(callback, deps) {
	return hookDispatcher.useCallback(callback, deps);
}

export function useMemo(create, deps) {
	return hookDispatcher.useMemo(create, deps);
}
