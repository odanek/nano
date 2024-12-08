import { createWorkInProgress, NanoFiber } from './fiber';
import { NanoFiberRoot, NanoFiberRootProps } from './fiber-root';
import { beginWork } from './update/begin-work';
import { completeWork } from './update/complete-work';
import {
  commitBeforeDeletion,
  commitBeforeMutation,
} from './update/before-mutation';
import {
  commitDeletion,
  commitDetachRef,
  commitMutation,
  commitPlacement,
  commitResetTextContent,
  commitStyleMutation,
} from './update/mutation';
import { commitAfterMutation, commitAttachRef } from './update/after-mutation';
import { visitFibersDepthFirst } from './traversal';
import {
  NanoEffectTag,
  runPassiveEffects,
  schedulePassiveEffects,
} from './effect';
import { isFlag } from '../util';

export function performSyncWorkOnRoot(root: NanoFiberRoot): void {
  // console.time('Virtual dom update');

  runPassiveEffects();

  const workInProgress = createWorkInProgress(root.current, null);
  root.workInProgress = workInProgress;

  workLoopSync(workInProgress as NanoFiber<unknown>);
  commitRoot(root);

  schedulePassiveEffects();

  // console.timeEnd('Virtual dom update');
}

function workLoopSync(workInProgress: NanoFiber | null): void {
  while (workInProgress !== null) {
    const unitOfWork = workInProgress;
    workInProgress = performUnitOfWork(workInProgress);

    if (workInProgress === null) {
      workInProgress = completeUnitOfWork(unitOfWork);
    }
  }
}

function performUnitOfWork(unitOfWork: NanoFiber): NanoFiber | null {
  const current = unitOfWork.alternate;
  const next = beginWork(current, unitOfWork);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  return next;
}

function completeUnitOfWork(unitOfWork: NanoFiber): NanoFiber | null {
  let completedWork: NanoFiber | null = unitOfWork;
  while (completedWork !== null) {
    const current: NanoFiber | null = completedWork.alternate;
    const returnFiber: NanoFiber | null = completedWork.return;

    completeWork(current, completedWork);

    const siblingFiber = completedWork.sibling;
    if (siblingFiber !== null) {
      return siblingFiber;
    }

    completedWork = returnFiber;
  }

  return null;
}

function commitRoot(root: NanoFiberRoot): void {
  const finishedWork = root.workInProgress as NanoFiber;
  visitFibersDepthFirst(finishedWork, fiberBeforeMutation, null);
  visitFibersDepthFirst(
    finishedWork,
    commitDeletionEffects,
    commitMutationEffects,
  );
  root.current = finishedWork as NanoFiber<NanoFiberRootProps>;
  root.workInProgress = null;
  visitFibersDepthFirst(finishedWork, null, fiberAfterMutation);
}

function fiberBeforeMutation(fiber: NanoFiber): void {
  const current = fiber.alternate;
  const effectTag = fiber.effectTag;

  if (isFlag(effectTag, NanoEffectTag.Effect)) {
    commitBeforeMutation(current);
  }

  const deletions = fiber.deletions;
  if (deletions !== null) {
    for (const childToDelete of deletions) {
      commitBeforeDeletion(childToDelete);
    }
  }
}

function commitDeletionEffects(fiber: NanoFiber): void {
  const deletions = fiber.deletions;
  if (deletions !== null) {
    for (const childToDelete of deletions) {
      commitDeletion(childToDelete);
    }
    fiber.deletions = null;
  }
}

function commitMutationEffects(fiber: NanoFiber): void {
  const current = fiber.alternate;
  const effectTag = fiber.effectTag;

  if (isFlag(effectTag, NanoEffectTag.ContentReset)) {
    commitResetTextContent(fiber);
  }
  if (isFlag(effectTag, NanoEffectTag.Ref)) {
    commitDetachRef(current);
  }
  if (isFlag(effectTag, NanoEffectTag.Placement)) {
    commitPlacement(fiber);
  }
  if (isFlag(effectTag, NanoEffectTag.Style)) {
    commitStyleMutation(current, fiber);
  }
  if (isFlag(effectTag, NanoEffectTag.Update)) {
    commitMutation(current, fiber);
  }
}

function fiberAfterMutation(fiber: NanoFiber): void {
  const effectTag = fiber.effectTag;

  if (isFlag(effectTag, NanoEffectTag.Effect)) {
    commitAfterMutation(fiber);
  }

  if (isFlag(effectTag, NanoEffectTag.Ref)) {
    commitAttachRef(fiber);
  }
}
