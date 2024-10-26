import { isFlag } from "@nano-ui/util";
import { createWorkInProgress, NanoFiber } from "./fiber";
import { NanoFiberRoot } from "./fiber-root";
import { beginWork } from "./update/begin-work";
import { completeWork } from "./update/complete-work";
import { commitBeforeDeletion, commitBeforeLifecycleEffects } from "./update/before-mutation";
import { NanoEffectTag } from "./type";
import { commitDeletion, commitDetachRef, commitMutation, commitPlacement, commitResetTextContent } from "./update/mutation";
import { commitAfterMutation, commitAttachRef } from "./update/after-mutation";
import { visitFibersDepthFirst } from "./traversal";

export function performSyncWorkOnRoot(root: NanoFiberRoot) {
	const start = performance.now();

	const workInProgress = createWorkInProgress(root.current, null);
	root.workInProgress = workInProgress;

	workLoopSync(workInProgress);
	commitRoot(root);

	const end = performance.now();
	console.log('Updated in: ', end - start, ' milliseconds');
}

function workLoopSync(workInProgress: NanoFiber | null) {
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

function completeUnitOfWork(unitOfWork: NanoFiber) {
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

function commitRoot(root: NanoFiberRoot) {
	const finishedWork = root.workInProgress as NanoFiber;
	visitFibersDepthFirst(finishedWork, commitBeforeMutationEffects, null);
	visitFibersDepthFirst(finishedWork, commitDeletionEffects, commitMutationEffects);
	root.current = finishedWork;
	root.workInProgress = null;
	visitFibersDepthFirst(finishedWork, null, commitAfterMutationEffects);
}

function commitBeforeMutationEffects(fiber: NanoFiber) {
	const current = fiber.alternate;
	const effectTag = fiber.effectTag;

	if (isFlag(effectTag, NanoEffectTag.Lifecycle)) {
		commitBeforeLifecycleEffects(current, fiber);
	}

	const deletions = fiber.deletions;
	if (deletions !== null) {
		for (const childToDelete of deletions) {
			commitBeforeDeletion(childToDelete);
		}
	}
}

function commitDeletionEffects(fiber: NanoFiber) {
	const deletions = fiber.deletions;
	if (deletions !== null) {
		for (const childToDelete of deletions) {
			commitDeletion(childToDelete);
		}
		fiber.deletions = null;
	}
}

function commitMutationEffects(fiber: NanoFiber) {
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
	if (isFlag(effectTag, NanoEffectTag.Update)) {
		commitMutation(current, fiber);
	}
}

function commitAfterMutationEffects(fiber: NanoFiber) {
	const current = fiber.alternate;
	const effectTag = fiber.effectTag;

	if (isFlag(effectTag, NanoEffectTag.Lifecycle)) {
		commitAfterMutation(current, fiber);
	}

	if (isFlag(effectTag, NanoEffectTag.Ref)) {
		commitAttachRef(fiber);
	}
}