import { NanoElementTag, NanoElementKey, NanoElementType, NanoEffectTag } from './type';
import { NanoElement } from './element';
import { NanoRef } from './ref';
import { NanoFiberRoot } from './fiber-root';
import { PlainObject } from '@nano-ui/type';
import { NanoHostComponentStateNode } from './host-component';
import { NanoHostTextStateNode } from './host-text';

const fiberKey = Symbol();
export class NanoFiber<P = PlainObject> {
  public tag: NanoElementTag;
  public type: NanoElementType;
  public key: NanoElementKey;
  public ref: NanoRef | null;
  public stateNode: NanoHostComponentStateNode | NanoHostTextStateNode | NanoFiberRoot | null;
  public return: NanoFiber | null;
  public child: NanoFiber | null;
  public sibling: NanoFiber | null;
  public index: number;
  public pendingProps: P;
  public memoizedProps: P | null;
  public memoizedState: unknown;
  public fullContext: Record<string, unknown> | null;
  public contextTypes: Array<string> | null;
  public memoizedContext: Record<string, unknown> | null;
  public memoizedStyle: object | null;
  public updateQueue: Array<unknown> | null;
  public effectTag: NanoEffectTag;
  public deletions: Array<NanoFiber> | null;

  public alternate: NanoFiber<P> | null;

  constructor(tag: NanoElementTag, pendingProps: P, key: NanoElementKey) {
    this.tag = tag;
    this.type = null;
    this.key = key;
    this.ref = null;
    this.stateNode = null;

    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.memoizedState = null;
    this.memoizedStyle = null;

    this.fullContext = null;
    this.contextTypes = null;
    this.memoizedContext = null;

    this.updateQueue = null;
    this.effectTag = NanoEffectTag.None;
    this.deletions = null;

    this.alternate = null;
  }
}

export function createFiber<P = PlainObject>(
  tag: NanoElementTag,
  pendingProps: P,
  key: NanoElementKey,
): NanoFiber<P> {
  return new NanoFiber(tag, pendingProps, key);
}

export function createWorkInProgress<P = PlainObject>(
  current: NanoFiber<P>,
  pendingProps: P,
): NanoFiber<P> {
  let workInProgress = current.alternate;
  // Double-buffering - reuse existing alternate fiber if already created
  if (workInProgress === null) {
    workInProgress = createFiber(current.tag, pendingProps, current.key);
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    workInProgress.contextTypes = current.contextTypes;
    current.alternate = workInProgress;
  } else {
    workInProgress.return = null;
    workInProgress.child = null;
    workInProgress.sibling = null;
    workInProgress.ref = null;
    workInProgress.index = 0;

    workInProgress.memoizedProps = null;
    workInProgress.memoizedState = null;
    workInProgress.memoizedStyle = null;
    workInProgress.pendingProps = pendingProps;

    workInProgress.fullContext = null;
    workInProgress.memoizedContext = null;

    workInProgress.effectTag = NanoEffectTag.None;
    workInProgress.deletions = [];
  }

  return workInProgress;
}

export function createFiberFromElement<P>(
  element: NanoElement<P>,
): NanoFiber<P> {
  const fiber = createFiber(element.tag, element.props, element.key);
  fiber.type = element.type;
  fiber.ref = element.ref;
  return fiber;
}

export function markInstanceFiber<T>(node: Node, fiber: NanoFiber<T>) {
  // @ts-expect-error Conversion to any
  node[fiberKey] = fiber;
}

export function unmarkInstanceFiber(node: Node) {
  // @ts-expect-error Conversion to any
  node[fiberKey] = null;
}

export function getInstanceFiber(node: Node): NanoFiber | undefined {
  // @ts-expect-error Conversion to any
  return node[fiberKey];
}
