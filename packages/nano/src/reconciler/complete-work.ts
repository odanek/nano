import { NanoEffectTag } from '../vdom/effect';
import { Fiber } from './fiber';
import { diffProperties } from '../dom/element'; // TODO
import { VNodeKind } from '../core/vnode';

export function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
): void {
  switch (workInProgress.kind) {
    case VNodeKind.Element:
      completeElementWork(current, workInProgress);
      break;
    case VNodeKind.Text:
      completeTextWork(current, workInProgress);
      break;
    case VNodeKind.Portal:
      completePortalWork(current, workInProgress);
      break;
    case VNodeKind.Decorator:
      completeDecoratorWork(current, workInProgress);
      break;
  }
}

function completeElementWork(
  current: Fiber | null,
  workInProgress: Fiber,
): void {
  if (current !== null) {
    updateHostComponent(current, workInProgress);
  } else {
    appendAllChildren(workInProgress.stateNode as Element, workInProgress);
  }
}

function completeTextWork(current: Fiber | null, workInProgress: Fiber): void {
  if (current !== null) {
    const oldText = current.memoizedProps;
    const newText = workInProgress.pendingProps;
    if (oldText !== newText) {
      workInProgress.effectTag |= NanoEffectTag.Update;
    }
  }
}

function completePortalWork(
  current: Fiber | null,
  workInProgress: Fiber,
): void {
  if (current === null) {
    appendAllChildren(workInProgress.type as Element, workInProgress);
  }
}

function completeDecoratorWork(
  current: Fiber | null,
  workInProgress: Fiber,
): void {
  workInProgress.effectTag |= NanoEffectTag.Update;
}

function updateHostComponent(current: Fiber, workInProgress: Fiber): void {
  const updatePayload = diffProperties(current, workInProgress);
  workInProgress.updateQueue = updatePayload;
  if (updatePayload) {
    workInProgress.effectTag |= NanoEffectTag.Update;
  }
}

function appendAllChildren(parent: Element, workInProgress: Fiber): void {
  let fiber = workInProgress.child;
  while (fiber !== null) {
    const kind = fiber.kind;
    if (kind === VNodeKind.Element || kind === VNodeKind.Text) {
      parent.appendChild(fiber.stateNode as Node);
    } else if (kind !== VNodeKind.Portal && fiber.child !== null) {
      fiber = fiber.child;
      continue;
    }

    if (fiber === workInProgress) {
      return;
    }
    while (fiber.sibling === null) {
      if (fiber.return === null || fiber.return === workInProgress) {
        return;
      }
      fiber = fiber.return;
    }
    fiber = fiber.sibling;
  }
}
