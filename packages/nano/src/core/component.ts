import { Fiber } from '../reconciler/fiber';
import { beginHooks, endHooks, Hook, HookTag } from '../hooks/hook';
import { type ReducerHookPayload } from '../hooks/payload';
import { objectEquals } from '../shared/object';
import type { Component, Renderable } from '../api/renderable';
import { compareContext } from './context';
import type { PlainObject } from '../shared/type';

type ComponentProps = PlainObject;

export function renderFunctionComponent(
  current: Fiber | null,
  workInProgress: Fiber,
): Renderable {
  beginHooks(workInProgress, current === null);

  const Component = workInProgress.type as Component;
  const props = workInProgress.pendingProps;
  const children = Component(props);

  endHooks();

  return children;
}

export function updateFunctionComponent(
  current: Fiber,
  workInProgress: Fiber,
): boolean {
  const hasContextUpdate = !compareContext(current, workInProgress);
  if (hasContextUpdate) {
    return true;
  }

  const oldProps = current.memoizedProps as ComponentProps;
  const newProps = workInProgress.pendingProps as ComponentProps;
  if (!objectEquals(oldProps, newProps)) {
    return true;
  }

  for (
    let hook = current.memoizedState as Hook | null;
    hook !== null;
    hook = hook.next
  ) {
    if (hook.tag === HookTag.Reducer) {
      const payload = hook.payload as ReducerHookPayload;
      if (payload.dirty) {
        return true;
      }
    }
  }

  return false;
}
