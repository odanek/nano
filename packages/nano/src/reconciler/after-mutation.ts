import { NanoFiber } from '../vdom/fiber';
import { runEffects } from '../vdom/effect';

export function commitAfterMutation(finishedWork: NanoFiber): void {
  runEffects(finishedWork);
}

export function commitAttachRef(finishedWork: NanoFiber): void {
  const ref = finishedWork.ref;
  if (ref !== null) {
    ref.current = finishedWork.stateNode;
  }
}
