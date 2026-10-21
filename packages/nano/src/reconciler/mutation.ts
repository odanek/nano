import { Fiber, unmarkInstanceFiber } from './fiber';
import {
  type TextProps,
  type TextStateNode,
  resetTextContent,
  updateTextInstance,
} from '../dom/text';
import {
  getDecoratorRoot,
  getElementParentFiber,
  getElementParentNode,
  getPlacedElementSibling,
} from '../core/traversal';
import {
  diffProperties,
  type ElementPropsDiff,
  type ElementStateNode,
  setInitialProperties,
  updateElementInstance,
} from '../dom/element';
import { runStyleEffects } from '../hooks/effect';
import { EffectTag } from '../hooks/effect';
import type { PlainObject } from '../shared/type';
import { isFlag } from '../shared/flags';
import type { DecoratorProps } from '../api/decorator';
import { VNodeKind } from '../api/vnode';

export function commitResetTextContent(fiber: Fiber): void {
  resetTextContent(fiber.stateNode as TextStateNode);
}

export function commitDetachRef(current: Fiber | null): void {
  if (current !== null) {
    const ref = current.ref;
    if (ref !== null) {
      ref.current = null;
    }
  }
}

export function commitPlacement(finishedWork: Fiber): void {
  const parentFiber = getElementParentFiber(finishedWork);
  const parentNode = getElementParentNode(parentFiber);

  if (isFlag(parentFiber.effectTag, EffectTag.ContentReset)) {
    resetTextContent(parentNode);
    parentFiber.effectTag &= ~EffectTag.ContentReset;
  }

  const before = getPlacedElementSibling(finishedWork, parentFiber);
  insertOrAppendPlacementNode(finishedWork, before, parentNode);

  finishedWork.effectTag &= ~EffectTag.Placement;
}

function insertOrAppendPlacementNode(
  fiber: Fiber,
  before: Node | null,
  parent: Node,
): void {
  const kind = fiber.kind;
  if (kind === VNodeKind.Element || kind === VNodeKind.Text) {
    placeElement(fiber, before, parent);
  } else if (kind !== VNodeKind.Portal) {
    let child = fiber.child;
    while (child !== null) {
      insertOrAppendPlacementNode(child, before, parent);
      child = child.sibling;
    }
  }
}

function placeElement(fiber: Fiber, before: Node | null, parent: Node): void {
  const stateNode = fiber.stateNode as Node;
  parent.insertBefore(stateNode, before);
}

export function commitStyleMutation(
  current: Fiber | null,
  finishedWork: Fiber,
): void {
  runStyleEffects(current, finishedWork);
}

export function commitMutation(
  current: Fiber | null,
  finishedWork: Fiber,
): void {
  switch (finishedWork.kind) {
    case VNodeKind.Element:
      commitElementMutation(current, finishedWork);
      return;
    case VNodeKind.Text:
      commitTextMutation(
        current as Fiber<TextProps>,
        finishedWork as Fiber<TextProps>,
      );
      return;
    case VNodeKind.Decorator:
      commitDecoratorMutation(
        current as Fiber<DecoratorProps>,
        finishedWork as Fiber<DecoratorProps>,
      );
      return;
  }
}

function commitElementMutation(
  current: Fiber | null,
  finishedWork: Fiber,
): void {
  const instance = finishedWork.stateNode as ElementStateNode;
  const updatePayload = finishedWork.updateQueue as ElementPropsDiff;
  finishedWork.updateQueue = null;

  if (updatePayload !== null) {
    updateElementInstance(instance, updatePayload);
  }
}

function commitTextMutation(
  current: Fiber<TextProps>,
  finishedWork: Fiber<TextProps>,
): void {
  const textInstance = finishedWork.stateNode as TextStateNode;
  const newText = finishedWork.memoizedProps as string;
  const oldText = current.memoizedProps as string;
  updateTextInstance(textInstance, newText, oldText);
}

function commitDecoratorMutation(
  current: Fiber<DecoratorProps>,
  finishedWork: Fiber<DecoratorProps>,
): void {
  const root = getDecoratorRoot(finishedWork);
  if (root) {
    if (current && current.stateNode === root) {
      const diff = diffProperties(current as Fiber, finishedWork as Fiber);
      if (diff) {
        updateElementInstance(root, diff);
      }
    } else {
      setInitialProperties(root, finishedWork.memoizedProps as PlainObject);
    }
  }
}

export function commitDeletion(current: Fiber): void {
  unmountElements(current, true);

  const alternate = current.alternate;
  commitDetachFiber(current);
  if (alternate !== null) {
    commitDetachFiber(alternate);
  }
}

function unmountElements(current: Fiber, detach: boolean): void {
  commitUnmount(current, detach);

  const isElement = current.kind === VNodeKind.Element;
  const isPortal = current.kind === VNodeKind.Portal;
  const detachChildren = isPortal || (detach && !isElement);

  for (let fiber = current.child; fiber !== null; fiber = fiber.sibling) {
    unmountElements(fiber, detachChildren);
  }
}

function commitUnmount(current: Fiber, removeNode: boolean): void {
  switch (current.kind) {
    case VNodeKind.Component:
      commitUnmountFunctionComponent(current);
      return;
    case VNodeKind.Element:
      commitUnmountElement(current, removeNode);
      return;
    case VNodeKind.Text:
      commitUnmountText(current, removeNode);
      return;
  }
}

function commitUnmountFunctionComponent(current: Fiber): void {
  runStyleEffects(current, null);
}

function commitUnmountElement(current: Fiber, removeNode: boolean): void {
  const node = current.stateNode as Element;
  unmarkInstanceFiber(node);
  commitDetachRef(current);
  if (removeNode) {
    node.remove();
  }
}

function commitUnmountText(current: Fiber, removeNode: boolean): void {
  const node = current.stateNode as TextStateNode;
  unmarkInstanceFiber(node);
  if (removeNode) {
    node.remove();
  }
}

function commitDetachFiber(fiber: Fiber): void {
  const alternate = fiber.alternate;
  if (alternate !== null) {
    alternate.return = null;
    fiber.alternate = null;
  }
  fiber.return = null;
  fiber.updateQueue = null;
}
