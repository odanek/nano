import { FiberRoot } from '../core/root';
import { type ElementStateNode } from '../dom/element'; // TODO
import { type TextStateNode } from '../dom/text'; // TODO
import { EffectTag, type EffectTagValue } from '../hooks/effect';
import { emptyObject } from '../shared/object';
import { emptyArray } from '../shared/array';
import type { Key } from '../api/key';
import type { Ref } from '../api/ref';
import type { VNode } from '../api/vnode';
import type { ContextKey } from '../core/context';

const fiberKey = Symbol('nano-fiber-key');

export class Fiber<P = unknown> {
  public kind: VNode['kind'];
  public type: VNode['type'];
  public key: Key | null;
  public ref: Ref | null;
  public stateNode: ElementStateNode | TextStateNode | FiberRoot | null;
  public return: Fiber | null;
  public child: Fiber | null;
  public sibling: Fiber | null;
  public index: number;
  public pendingProps: P;
  public memoizedProps: P | null;
  public memoizedState: unknown;
  public fullContext: Record<ContextKey, unknown>;
  public contextTypes: readonly ContextKey[];
  public updateQueue: Array<unknown> | null;
  public effectTag: EffectTagValue;
  public deletions: Array<Fiber> | null;
  public alternate: Fiber<P> | null;

  constructor(kind: VNode['kind'], pendingProps: P, key: Key) {
    this.kind = kind;
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

    this.fullContext = emptyObject;
    this.contextTypes = emptyArray;

    this.updateQueue = null;
    this.effectTag = EffectTag.None;
    this.deletions = null;

    this.alternate = null;
  }
}

export function createFiber<P>(
  kind: VNode['kind'],
  pendingProps: P,
  key: Key,
): Fiber<P> {
  return new Fiber(kind, pendingProps, key);
}

export function createWorkInProgress<P>(
  current: Fiber<P>,
  pendingProps: P,
): Fiber<P> {
  let workInProgress = current.alternate;
  // Double-buffering - reuse existing alternate fiber if already created
  if (workInProgress === null) {
    workInProgress = createFiber(current.kind, pendingProps, current.key);
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
    workInProgress.pendingProps = pendingProps;

    workInProgress.fullContext = emptyObject;

    workInProgress.effectTag = EffectTag.None;
    workInProgress.deletions = [];
  }

  return workInProgress;
}

export function createFiberFromVNode<P>(element: VNode): Fiber<P> {
  const fiber = createFiber(element.kind, element.props, element.key);
  fiber.type = element.type;
  fiber.ref = element.ref;
  return fiber;
}

export function markInstanceFiber<T>(node: Node, fiber: Fiber<T>): void {
  // @ts-expect-error Conversion to any
  node[fiberKey] = fiber;
}

export function unmarkInstanceFiber(node: Node): void {
  // @ts-expect-error Conversion to any
  node[fiberKey] = null;
}

export function getInstanceFiber(node: Node): Fiber | null {
  // @ts-expect-error Conversion to any
  return node[fiberKey] ?? null;
}
