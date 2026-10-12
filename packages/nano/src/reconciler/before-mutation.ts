import { Fiber } from './fiber';
import { runEffects, cleanupEffects } from '../hooks/effect';
import { visitFibersDepthFirst } from '../vdom/traversal';
import { VNodeKind } from '../api/vnode';

export function commitBeforeMutation(current: Fiber | null): void {
  if (current !== null) {
    runEffects(current);
  }
}

export function commitBeforeDeletion(current: Fiber): void {
  visitFibersDepthFirst(current, commitBeforeUnmount, null);
}

function commitBeforeUnmount(current: Fiber): void {
  switch (current.kind) {
    case VNodeKind.Component:
      commitBeforeUnmountFunctionComponent(current);
      return;
  }
}

function commitBeforeUnmountFunctionComponent(current: Fiber): void {
  cleanupEffects(current);
}
