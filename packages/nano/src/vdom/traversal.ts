import { NanoFiber } from './fiber';
import { NanoFiberRoot } from './fiber-root';
import { NanoElementTag } from './element';
import { NanoEffectTag } from './effect';
import { isFlag } from '../shared/flags';

type TraversalCallback = (fiber: NanoFiber) => void;

export function findFiberRoot(fiber: NanoFiber): NanoFiber {
  let current = fiber;
  while (current.tag !== NanoElementTag.HostRoot) {
    current = current.return as NanoFiber;
  }
  return current;
}

export function visitFibersDepthFirst(
  root: NanoFiber | null,
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

export function getHostParentFiber(fiber: NanoFiber): NanoFiber {
  let parent = fiber.return;
  while (parent !== null) {
    const tag = parent.tag;
    if (
      tag === NanoElementTag.HostComponent ||
      tag === NanoElementTag.HostRoot ||
      tag === NanoElementTag.HostPortal
    ) {
      return parent;
    }
    parent = parent.return;
  }
  throw new Error('Host component parent fiber not found');
}

export function getHostParentNode(parentFiber: NanoFiber): Element {
  const parentStateNode = parentFiber.stateNode;
  switch (parentFiber.tag) {
    case NanoElementTag.HostComponent:
      return parentStateNode as Element;
    case NanoElementTag.HostRoot:
      return (parentStateNode as NanoFiberRoot).container;
    case NanoElementTag.HostPortal:
      return parentFiber.type as Element;
    default:
      throw new Error('Invalid host parent fiber');
  }
}

export function getPlacedHostSibling(
  fiber: NanoFiber,
  hostParent: NanoFiber,
): Element | null {
  let node = fiber;
  let emerged = true;

  while (node !== hostParent) {
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
      const tag = node.tag;
      const isPlacement = isFlag(node.effectTag, NanoEffectTag.Placement);
      const isHost =
        tag === NanoElementTag.HostComponent || tag === NanoElementTag.HostText;

      if (isHost) {
        if (isPlacement) {
          emerged = true;
        } else {
          return node.stateNode as Element;
        }
      } else {
        const child = node.child;
        if (
          !isPlacement &&
          child !== null &&
          node.tag !== NanoElementTag.HostPortal
        ) {
          node = child;
        } else {
          emerged = true;
        }
      }
    }
  }

  return null;
}

export function getDecoratorRoot<T>(fiber: NanoFiber<T>): Element | null {
  let current = fiber.child;
  while (current !== null) {
    if (current.sibling !== null) {
      return null;
    }

    switch (current.tag) {
      case NanoElementTag.HostComponent:
        return current.stateNode as Element;
      case NanoElementTag.HostDecorator:
      case NanoElementTag.FunctionComponent:
      case NanoElementTag.Fragment:
      case NanoElementTag.Context:
        current = current.child;
        break;
      default:
        return null;
    }
  }
  return null;
}
