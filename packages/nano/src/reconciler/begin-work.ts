import { markInstanceFiber, Fiber } from './fiber';
import { createElementInstance } from '../dom/element'; // TODO
import { createTextInstance } from '../dom/text'; // TODO
import { type NanoFiberRootState } from '../vdom/fiber-root';
import {
  cloneChildFibers,
  mountChildFibers,
  reconcileChildFibers,
} from './reconcile';
import {
  renderFunctionComponent,
  updateFunctionComponent,
} from '../vdom/function-component';
import { NanoEffectTag } from '../vdom/effect';
import { isNumber, isString } from '../shared/predicate';
import {
  emptyContext,
  getContextKey,
  type Context,
  type ContextProps,
} from '../core/context';
import { VNodeKind } from '../core/vnode';
import type { PropsWithChildren, Renderable } from '../core/renderable';

export function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
): Fiber | null {
  propagateContext(workInProgress);

  switch (workInProgress.kind) {
    case VNodeKind.Component:
      return beginComponent(current, workInProgress);
    case VNodeKind.Root:
      return beginRoot(current as Fiber, workInProgress);
    case VNodeKind.Element:
      return beginElement(current, workInProgress);
    case VNodeKind.Text:
      return beginText(current, workInProgress);
    case VNodeKind.Portal:
    case VNodeKind.Fragment:
    case VNodeKind.Context:
    case VNodeKind.Decorator:
      return beginNode(current, workInProgress);
  }
  return null;
}

function propagateContext(workInProgress: Fiber): void {
  const returnFiber = workInProgress.return;
  const fullContext =
    returnFiber === null ? emptyContext : returnFiber.fullContext;

  if (workInProgress.kind === VNodeKind.Context) {
    const context = workInProgress.type as Context;
    const key = getContextKey(context);
    const value = (workInProgress.pendingProps as ContextProps).value;
    workInProgress.fullContext = Object.freeze({
      ...fullContext,
      [key]: value,
    });
  } else {
    workInProgress.fullContext = fullContext;
  }
}

function beginComponent(
  current: Fiber | null,
  workInProgress: Fiber,
): Fiber | null {
  if (current !== null) {
    const shouldUpdate = updateFunctionComponent(current, workInProgress);
    if (!shouldUpdate) {
      workInProgress.memoizedState = current.memoizedState;
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }
  }

  const nextChildren = renderFunctionComponent(current, workInProgress);
  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function beginRoot(current: Fiber, workInProgress: Fiber): Fiber | null {
  const prevState = current.memoizedState as NanoFiberRootState;
  const prevChildren = prevState?.element ?? null;

  const updateQueue = current.updateQueue;
  const nextState = (
    updateQueue === null ? current.memoizedState : updateQueue[0]
  ) as NanoFiberRootState;
  workInProgress.memoizedState = nextState;
  workInProgress.updateQueue = null;

  const nextChildren = nextState.element;
  if (nextChildren === prevChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }
  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function beginElement(
  current: Fiber | null,
  workInProgress: Fiber,
): Fiber | null {
  if (current === null) {
    workInProgress.stateNode = createElementInstance(workInProgress);
  }

  const nextProps = workInProgress.pendingProps as PropsWithChildren;
  const prevProps =
    current !== null ? (current.memoizedProps as PropsWithChildren) : null;

  let nextChildren = nextProps.children as Renderable;
  // Direct text child optimization - do not create a new fiber
  const isDirectTextChild = shouldSetTextContent(nextChildren);

  if (isDirectTextChild) {
    nextChildren = null;
  } else if (
    prevProps !== null &&
    shouldSetTextContent(prevProps.children as Renderable)
  ) {
    workInProgress.effectTag |= NanoEffectTag.ContentReset;
  }

  markRef(current, workInProgress);
  markInstanceFiber(workInProgress.stateNode as Element, workInProgress);

  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function beginText(current: Fiber | null, workInProgress: Fiber): Fiber | null {
  if (current === null) {
    workInProgress.stateNode = createTextInstance(
      workInProgress.pendingProps as string,
    );
  }
  markInstanceFiber(workInProgress.stateNode as Node, workInProgress);
  return null;
}

function beginNode(current: Fiber | null, workInProgress: Fiber): Fiber | null {
  const nextChildren = (workInProgress.pendingProps as PropsWithChildren)
    .children;
  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function shouldSetTextContent(children: Renderable): boolean {
  return isString(children) || isNumber(children);
}

function markRef(current: Fiber | null, workInProgress: Fiber): void {
  const ref = workInProgress.ref;
  if (
    (current === null && ref !== null) ||
    (current !== null && current.ref !== ref)
  ) {
    workInProgress.effectTag |= NanoEffectTag.Ref;
  }
}

function bailoutOnAlreadyFinishedWork(
  current: Fiber,
  workInProgress: Fiber,
): Fiber | null {
  cloneChildFibers(current, workInProgress);
  return workInProgress.child;
}

function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: Renderable | undefined,
): void {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
  } else {
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
    );
  }
}
