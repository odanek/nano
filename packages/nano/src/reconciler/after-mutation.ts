import { Fiber } from './fiber';
import { runEffects } from '../hooks/effect';

export function commitAfterMutation(finishedWork: Fiber): void {
  runEffects(finishedWork);
}

export function commitAttachRef(finishedWork: Fiber): void {
  const ref = finishedWork.ref;
  if (ref !== null) {
    ref.current = finishedWork.stateNode;
  }
}
