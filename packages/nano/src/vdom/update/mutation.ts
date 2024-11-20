import { NanoFiber, unmarkInstanceFiber } from '../fiber';
import {
  NanoHostTextProps,
  NanoHostTextStateNode,
  resetHostTextContent,
  updateHostTextInstance,
} from '../host/text';
import {
  getHostParentFiber,
  getHostParentNode,
  getPlacedHostSibling,
} from '../traversal';
import {
  NanoHostComponentPropsDiff,
  NanoHostComponentStateNode,
  updateHostComponentInstance,
} from '../host/component';
import { mountStyleEffects } from '../function-component';
import { NanoEffectTag } from '../effect';
import { NanoElementTag } from '../element';
import { isFlag } from '../../util';

export function commitResetTextContent(fiber: NanoFiber): void {
  resetHostTextContent(fiber.stateNode as NanoHostTextStateNode);
}

export function commitDetachRef(current: NanoFiber | null): void {
  if (current !== null) {
    const ref = current.ref;
    if (ref !== null) {
      ref.current = null;
    }
  }
}

export function commitPlacement(finishedWork: NanoFiber): void {
  const parentFiber = getHostParentFiber(finishedWork);
  const parentNode = getHostParentNode(parentFiber);

  if (isFlag(parentFiber.effectTag, NanoEffectTag.ContentReset)) {
    resetHostTextContent(parentNode);
    parentFiber.effectTag &= ~NanoEffectTag.ContentReset;
  }

  const before = getPlacedHostSibling(finishedWork, parentFiber);
  insertOrAppendPlacementNode(finishedWork, before, parentNode);

  finishedWork.effectTag &= ~NanoEffectTag.Placement;
}

function insertOrAppendPlacementNode(
  fiber: NanoFiber,
  before: Node | null,
  parent: Node,
): void {
  const tag = fiber.tag;
  if (tag === NanoElementTag.HostComponent || tag === NanoElementTag.HostText) {
    placeHostComponent(fiber, before, parent);
  } else if (tag !== NanoElementTag.HostPortal) {
    let child = fiber.child;
    while (child !== null) {
      insertOrAppendPlacementNode(child, before, parent);
      child = child.sibling;
    }
  }
}

function placeHostComponent(
  fiber: NanoFiber,
  before: Node | null,
  parent: Node,
): void {
  const stateNode = fiber.stateNode as Node;
  parent.insertBefore(stateNode, before);
}

export function commitStyleMutation(
  current: NanoFiber | null,
  finishedWork: NanoFiber,
): void {
  // TODO Better name
  mountStyleEffects(current, finishedWork);
}

export function commitMutation(
  current: NanoFiber | null,
  finishedWork: NanoFiber,
): void {
  switch (finishedWork.tag) {
    case NanoElementTag.HostComponent:
      commitHostComponentMutation(current, finishedWork);
      return;
    case NanoElementTag.HostText:
      commitHostTextMutation(
        current as NanoFiber<NanoHostTextProps>,
        finishedWork as NanoFiber<NanoHostTextProps>,
      );
      return;
  }
}

function commitHostComponentMutation(
  current: NanoFiber | null,
  finishedWork: NanoFiber,
): void {
  const instance = finishedWork.stateNode as NanoHostComponentStateNode;
  const updatePayload = finishedWork.updateQueue as NanoHostComponentPropsDiff;
  finishedWork.updateQueue = null;

  if (updatePayload !== null) {
    updateHostComponentInstance(instance, updatePayload);
  }
}

function commitHostTextMutation(
  current: NanoFiber<string>,
  finishedWork: NanoFiber<string>,
): void {
  const textInstance = finishedWork.stateNode as NanoHostTextStateNode;
  const newText = finishedWork.memoizedProps as string;
  const oldText = current.memoizedProps as string;
  updateHostTextInstance(textInstance, newText, oldText);
}

export function commitDeletion(current: NanoFiber): void {
  unmountHostComponents(current, true);

  const alternate = current.alternate;
  commitDetachFiber(current);
  if (alternate !== null) {
    commitDetachFiber(alternate);
  }
}

function unmountHostComponents(current: NanoFiber, detach: boolean): void {
  commitUnmount(current, detach);

  const isElement = current.tag === NanoElementTag.HostComponent;
  const isPortal = current.tag === NanoElementTag.HostPortal;
  const detachChildren = isPortal || (detach && !isElement);

  for (let fiber = current.child; fiber !== null; fiber = fiber.sibling) {
    unmountHostComponents(fiber, detachChildren);
  }
}

function commitUnmount(current: NanoFiber, removeNode: boolean): void {
  switch (current.tag) {
    case NanoElementTag.FunctionComponent:
      commitUnmountFunctionComponent(current);
      return;
    case NanoElementTag.HostComponent:
      commitUnmountHostComponent(current, removeNode);
      return;
    case NanoElementTag.HostText:
      commitUnmountHostText(current, removeNode);
      return;
    case NanoElementTag.HostPortal:
      unmountHostComponents(current, true);
      return;
  }
}

function commitUnmountFunctionComponent(current: NanoFiber): void {
  mountStyleEffects(current, null);
}

function commitUnmountHostComponent(
  current: NanoFiber,
  removeNode: boolean,
): void {
  const node = current.stateNode as Element;
  unmarkInstanceFiber(node);
  commitDetachRef(current);
  if (removeNode) {
    node.remove();
  }
}

function commitUnmountHostText(current: NanoFiber, removeNode: boolean): void {
  const node = current.stateNode as NanoHostTextStateNode;
  unmarkInstanceFiber(node);
  if (removeNode) {
    node.remove();
  }
}

function commitDetachFiber(fiber: NanoFiber): void {
  const alternate = fiber.alternate;
  if (alternate !== null) {
    alternate.return = null;
    fiber.alternate = null;
  }
  fiber.return = null;
  fiber.updateQueue = null;
}
