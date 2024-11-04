import { NanoElementTag } from '../element';
import { NanoFiber } from '../fiber';
import { runEffects, cleanupEffects } from '../effect';
import { visitFibersDepthFirst } from '../traversal';

export function commitBeforeMutation(current: NanoFiber | null): void {
  if (current !== null) {
    runEffects(current);
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
  cleanupEffects(current);
}
