import { NanoElementTag } from '../vdom/element';
import { NanoFiber } from '../vdom/fiber';
import { runEffects, cleanupEffects } from '../vdom/effect';
import { visitFibersDepthFirst } from '../vdom/traversal';

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
