import { NanoFiber } from '../fiber';
import { diffProperties } from '../host-component';
import { NanoEffectTag, NanoElementTag } from '../type';

export function completeWork(current: NanoFiber, workInProgress: NanoFiber) {
  switch (workInProgress.tag) {
    case NanoElementTag.HostComponent:
      completeHostComponentWork(current, workInProgress);
      break;
    case NanoElementTag.HostText:
      completeHostTextWork(current, workInProgress);
      break;
    case NanoElementTag.HostPortal:
      completeHostPortalWork(current, workInProgress);
      break;
  }
}

function completeHostComponentWork(
  current: NanoFiber,
  workInProgress: NanoFiber,
) {
  if (current !== null) {
    updateHostComponent(current, workInProgress);
  } else {
    appendAllChildren(workInProgress.stateNode as Element, workInProgress);
  }
}

function completeHostTextWork(current: NanoFiber, workInProgress: NanoFiber) {
  if (current !== null) {
    const oldText = current.memoizedProps;
    const newText = workInProgress.pendingProps;
    if (oldText !== newText) {
      workInProgress.effectTag |= NanoEffectTag.Update;
    }
  }
}

function completeHostPortalWork(current: NanoFiber, workInProgress: NanoFiber) {
  if (current === null) {
    appendAllChildren(workInProgress.type as Element, workInProgress);
  }
}

function updateHostComponent(current: NanoFiber, workInProgress: NanoFiber) {
  const updatePayload = diffProperties(current, workInProgress);
  workInProgress.updateQueue = updatePayload;
  if (updatePayload) {
    workInProgress.effectTag |= NanoEffectTag.Update;
  }
}

function appendAllChildren(parent: Element, workInProgress: NanoFiber) {
  let fiber = workInProgress.child;
  while (fiber !== null) {
    const tag = fiber.tag;
    if (
      tag === NanoElementTag.HostComponent ||
      tag === NanoElementTag.HostText
    ) {
      parent.appendChild(fiber.stateNode as Node);
    } else if (tag !== NanoElementTag.HostPortal && fiber.child !== null) {
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
