import { isNumber, isString } from '@nano-ui/type';
import { markInstanceFiber, NanoFiber } from '../fiber';
import { createHostComponentInstance, NanoHostComponentProps } from '../host-component';
import { createHostTextInstance } from '../host-text';
import { NanoFiberRootState } from '../fiber-root';
import { NanoChildren, NanoEffectTag, NanoElementTag, NanoPropsWithChildren } from '../type';
import { cloneChildFibers, mountChildFibers, reconcileChildFibers } from './reconcile';
import { emptyContext, getContextKey, NanoContext, NanoContextProps } from '../context';
import { renderFunctionComponent, updateFunctionComponent } from '../function-component';

export function beginWork(
  current: NanoFiber | null,
  workInProgress: NanoFiber,
): NanoFiber | null {
  propagateContext(workInProgress);

  switch (workInProgress.tag) {
    case NanoElementTag.FunctionComponent:
      return beginFunctionComponent(current, workInProgress);
    case NanoElementTag.HostRoot:
      return beginHostRoot(current as NanoFiber, workInProgress);
    case NanoElementTag.HostComponent:
      return beginHostComponent(current, workInProgress);
    case NanoElementTag.HostText:
      return beginHostText(current, workInProgress);
    case NanoElementTag.HostPortal:
    case NanoElementTag.Fragment:
    case NanoElementTag.Context:
      return beginElement(current, workInProgress);
  }
}

function propagateContext(workInProgress: NanoFiber) {
  const returnFiber = workInProgress.return;
  const fullContext =
    returnFiber === null ? emptyContext : returnFiber.fullContext;

  if (workInProgress.tag === NanoElementTag.Context) {
    const context = workInProgress.type as NanoContext;
    const key = getContextKey(context);
    const value = (workInProgress.pendingProps as NanoContextProps).value;
    workInProgress.fullContext = Object.freeze({
      ...fullContext,
      [key]: value,
    });
  } else {
    workInProgress.fullContext = fullContext;
  }
}

function beginFunctionComponent(
  current: NanoFiber | null,
  workInProgress: NanoFiber,
): NanoFiber | null {
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

function beginHostRoot(
  current: NanoFiber,
  workInProgress: NanoFiber,
): NanoFiber | null {
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

function beginHostComponent(
  current: NanoFiber | null,
  workInProgress: NanoFiber,
): NanoFiber | null {
  if (current === null) {
    workInProgress.stateNode = createHostComponentInstance(workInProgress);
  }

  const nextProps = workInProgress.pendingProps as NanoHostComponentProps;
  const prevProps = current !== null ? current.memoizedProps as NanoHostComponentProps : null;

  let nextChildren = nextProps.children as NanoChildren;
  // Direct text child optimization - do not create a new fiber
  const isDirectTextChild = shouldSetTextContent(nextChildren);

  if (isDirectTextChild) {
    nextChildren = null;
  } else if (
    prevProps !== null &&
    shouldSetTextContent(prevProps.children as NanoChildren)
  ) {
    workInProgress.effectTag |= NanoEffectTag.ContentReset;
  }

  markRef(current, workInProgress);
  markInstanceFiber(workInProgress.stateNode as Element, workInProgress);

  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function beginHostText(
  current: NanoFiber | null,
  workInProgress: NanoFiber,
): NanoFiber | null {
  if (current === null) {
    workInProgress.stateNode = createHostTextInstance(
      workInProgress.pendingProps as string,
    );
  }
  markInstanceFiber(workInProgress.stateNode as Node, workInProgress);
  return null;
}

function beginElement(
  current: NanoFiber | null,
  workInProgress: NanoFiber,
): NanoFiber | null {
  const nextChildren = (workInProgress.pendingProps as NanoPropsWithChildren).children;
  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function shouldSetTextContent(children: NanoChildren) {
  return isString(children) || isNumber(children);
}

function markRef(current: NanoFiber | null, workInProgress: NanoFiber) {
  const ref = workInProgress.ref;
  if (
    (current === null && ref !== null) ||
    (current !== null && current.ref !== ref)
  ) {
    workInProgress.effectTag |= NanoEffectTag.Ref;
  }
}

function bailoutOnAlreadyFinishedWork(
  current: NanoFiber,
  workInProgress: NanoFiber,
) {
  cloneChildFibers(current, workInProgress);
  return workInProgress.child;
}

function reconcileChildren(
  current: NanoFiber | null,
  workInProgress: NanoFiber,
  nextChildren: NanoChildren,
) {
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
