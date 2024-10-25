import { NanoFiber } from '../fiber';
import { mountLifecycleEffects } from '../function-component';

export function commitAfterMutation(current: NanoFiber, finishedWork: NanoFiber) {
    mountLifecycleEffects(current, finishedWork);
}

export function commitAttachRef(finishedWork: NanoFiber) {
	const ref = finishedWork.ref;
	if (ref !== null) {
		ref.current = finishedWork.stateNode;
	}
}
