import { NanoElementTag } from '../element';
import { NanoFiber } from '../fiber';
import { unmountLifecycleEffects } from '../function-component';
import { visitFibersDepthFirst } from '../traversal';

export function commitBeforeLifecycleEffects(
  current: NanoFiber | null,
  finishedWork: NanoFiber,
): void {
  if (current !== null) {
    unmountLifecycleEffects(current, finishedWork);
  }
}

export function commitBeforeDeletion(current: NanoFiber): void {
  visitFibersDepthFirst(current, commitBeforeUnmount, null);
}

function commitBeforeUnmount(current: NanoFiber): void {
  switch (current.tag) {
    case NanoElementTag.FunctionComponent:
      commitBeforeUnmountFunctionComponent(current);
      return;
  }
}

function commitBeforeUnmountFunctionComponent(current: NanoFiber): void {
  unmountLifecycleEffects(current, null);
}
