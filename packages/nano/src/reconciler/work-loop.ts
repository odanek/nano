import { createWorkInProgress, Fiber } from './fiber';
import { FiberRoot, type NanoFiberRootProps } from '../core/root';
import { beginWork } from './begin-work';
import { completeWork } from './complete-work';
import { commitBeforeDeletion, commitBeforeMutation } from './before-mutation';
import {
  commitDeletion,
  commitDetachRef,
  commitMutation,
  commitPlacement,
  commitResetTextContent,
  commitStyleMutation,
} from './mutation';
import { commitAfterMutation, commitAttachRef } from './after-mutation';
import { visitFibersDepthFirst } from '../core/traversal';
import {
  EffectTag,
  runPassiveEffects,
  schedulePassiveEffects,
} from '../hooks/effect';
import { isFlag } from '../shared/flags';

export function performSyncWorkOnRoot(root: FiberRoot): void {
  // console.time('Virtual dom update');

  runPassiveEffects();

  const workInProgress = createWorkInProgress(root.current, null);
  root.workInProgress = workInProgress;

  workLoopSync(workInProgress as Fiber<unknown>);
  commitRoot(root);

  schedulePassiveEffects();

  // console.timeEnd('Virtual dom update');
}

function workLoopSync(workInProgress: Fiber | null): void {
  while (workInProgress !== null) {
    const unitOfWork = workInProgress;
    workInProgress = performUnitOfWork(workInProgress);

    if (workInProgress === null) {
      workInProgress = completeUnitOfWork(unitOfWork);
    }
  }
}

function performUnitOfWork(unitOfWork: Fiber): Fiber | null {
  const current = unitOfWork.alternate;
  const next = beginWork(current, unitOfWork);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  return next;
}

function completeUnitOfWork(unitOfWork: Fiber): Fiber | null {
  let completedWork: Fiber | null = unitOfWork;
  while (completedWork !== null) {
    const current: Fiber | null = completedWork.alternate;
    const returnFiber: Fiber | null = completedWork.return;

    completeWork(current, completedWork);

    const siblingFiber = completedWork.sibling;
    if (siblingFiber !== null) {
      return siblingFiber;
    }

    completedWork = returnFiber;
  }

  return null;
}

function commitRoot(root: FiberRoot): void {
  const finishedWork = root.workInProgress as Fiber;
  visitFibersDepthFirst(finishedWork, fiberBeforeMutation, null);
  visitFibersDepthFirst(
    finishedWork,
    commitDeletionEffects,
    commitMutationEffects,
  );
  root.current = finishedWork as Fiber<NanoFiberRootProps>;
  root.workInProgress = null;
  visitFibersDepthFirst(finishedWork, null, fiberAfterMutation);
}

function fiberBeforeMutation(fiber: Fiber): void {
  const current = fiber.alternate;
  const effectTag = fiber.effectTag;

  if (isFlag(effectTag, EffectTag.Effect)) {
    commitBeforeMutation(current);
  }

  const deletions = fiber.deletions;
  if (deletions !== null) {
    for (const childToDelete of deletions) {
      commitBeforeDeletion(childToDelete);
    }
  }
}

function commitDeletionEffects(fiber: Fiber): void {
  const deletions = fiber.deletions;
  if (deletions !== null) {
    for (const childToDelete of deletions) {
      commitDeletion(childToDelete);
    }
    fiber.deletions = null;
  }
}

function commitMutationEffects(fiber: Fiber): void {
  const current = fiber.alternate;
  const effectTag = fiber.effectTag;

  if (isFlag(effectTag, EffectTag.ContentReset)) {
    commitResetTextContent(fiber);
  }
  if (isFlag(effectTag, EffectTag.Ref)) {
    commitDetachRef(current);
  }
  if (isFlag(effectTag, EffectTag.Placement)) {
    commitPlacement(fiber);
  }
  if (isFlag(effectTag, EffectTag.Style)) {
    commitStyleMutation(current, fiber);
  }
  if (isFlag(effectTag, EffectTag.Update)) {
    commitMutation(current, fiber);
  }
}

function fiberAfterMutation(fiber: Fiber): void {
  const effectTag = fiber.effectTag;

  if (isFlag(effectTag, EffectTag.Effect)) {
    commitAfterMutation(fiber);
  }

  if (isFlag(effectTag, EffectTag.Ref)) {
    commitAttachRef(fiber);
  }
}
