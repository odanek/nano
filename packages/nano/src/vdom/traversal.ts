import { Fiber } from '../reconciler/fiber';
import { EffectTag } from '../hooks/effect';
import { isFlag } from '../shared/flags';
import { VNodeKind } from '../api/vnode';
import type { FiberRoot } from './fiber-root';

type TraversalCallback = (fiber: Fiber) => void;

export function findFiberRoot(fiber: Fiber): Fiber {
  let current = fiber;
  while (current.kind !== VNodeKind.Root) {
    current = current.return as Fiber;
  }
  return current;
}

export function visitFibersDepthFirst(
  root: Fiber | null,
  beforeHandler: TraversalCallback | null,
  afterHandler: TraversalCallback | null,
): void {
  let fiber = root;
  let emerged = false;

  while (fiber !== null) {
    if (!emerged) {
      beforeHandler?.(fiber);

      if (fiber.child !== null) {
        fiber = fiber.child;
      } else {
        emerged = true;
      }
    } else {
      afterHandler?.(fiber);

      if (fiber === root) {
        break;
      } else {
        const sibling = fiber.sibling;
        if (sibling !== null) {
          emerged = false;
          fiber = sibling;
        } else {
          emerged = true;
          fiber = fiber.return;
        }
      }
    }
  }
}

export function getElementParentFiber(fiber: Fiber): Fiber {
  let parent = fiber.return;
  while (parent !== null) {
    const kind = parent.kind;
    if (
      kind === VNodeKind.Element ||
      kind === VNodeKind.Root ||
      kind === VNodeKind.Portal
    ) {
      return parent;
    }
    parent = parent.return;
  }
  throw new Error('Could not find parent fiber of element kind');
}

export function getElementParentNode(parentFiber: Fiber): Element {
  const parentStateNode = parentFiber.stateNode;
  switch (parentFiber.kind) {
    case VNodeKind.Element:
      return parentStateNode as Element;
    case VNodeKind.Root:
      return (parentStateNode as FiberRoot).container;
    case VNodeKind.Portal:
      return parentFiber.type as Element;
    default:
      throw new Error('Could not find parent element - invalid fiber kind');
  }
}

export function getPlacedElementSibling(
  fiber: Fiber,
  elementParent: Fiber,
): Element | null {
  let node = fiber;
  let emerged = true;

  while (node !== elementParent) {
    if (emerged) {
      const sibling = node.sibling;
      if (sibling === null) {
        // @ts-expect-error Null should not happen
        node = node.return;
      } else {
        emerged = false;
        node = sibling;
      }
    } else {
      const kind = node.kind;
      const isPlacement = isFlag(node.effectTag, EffectTag.Placement);
      const isElement = kind === VNodeKind.Element || kind === VNodeKind.Text;

      if (isElement) {
        if (isPlacement) {
          emerged = true;
        } else {
          return node.stateNode as Element;
        }
      } else {
        const child = node.child;
        if (!isPlacement && child !== null && node.kind !== VNodeKind.Portal) {
          node = child;
        } else {
          emerged = true;
        }
      }
    }
  }

  return null;
}

export function getDecoratorRoot<T>(fiber: Fiber<T>): Element | null {
  let current = fiber.child;
  while (current !== null) {
    if (current.sibling !== null) {
      return null;
    }

    switch (current.kind) {
      case VNodeKind.Element:
        return current.stateNode as Element;
      case VNodeKind.Decorator:
      case VNodeKind.Component:
      case VNodeKind.Fragment:
      case VNodeKind.Context:
        current = current.child;
        break;
      default:
        return null;
    }
  }
  return null;
}
