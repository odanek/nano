import { NanoFiber } from '../fiber';
import { mountLifecycleEffects } from '../function-component';

export function commitAfterMutation(
  current: NanoFiber | null,
  finishedWork: NanoFiber,
): void {
  mountLifecycleEffects(current, finishedWork);
}

export function commitAttachRef(finishedWork: NanoFiber): void {
  const ref = finishedWork.ref;
  if (ref !== null) {
    ref.current = finishedWork.stateNode;
  }
}
