import { NanoFiber } from '../fiber';
import { unmountLifecycleEffects } from '../function-component';
import { visitFibersDepthFirst } from '../traversal';
import { NanoElementTag } from '../type';

export function commitBeforeLifecycleEffects(
  current: NanoFiber | null,
  finishedWork: NanoFiber,
) {
  if (current !== null) {
    unmountLifecycleEffects(current, finishedWork);
  }
}

export function commitBeforeDeletion(current: NanoFiber) {
  visitFibersDepthFirst(current, commitBeforeUnmount, null);
}

function commitBeforeUnmount(current: NanoFiber) {
  switch (current.tag) {
    case NanoElementTag.FunctionComponent:
      commitBeforeUnmountFunctionComponent(current);
      return;
  }
}

function commitBeforeUnmountFunctionComponent(current: NanoFiber) {
  unmountLifecycleEffects(current, null);
}
