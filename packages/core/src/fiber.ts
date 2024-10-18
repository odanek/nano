import { FlagGenerator } from '@nano-ui/util';
import { FiberKey, FiberProps, FiberType } from './type';
import { Element } from './element';
import { Ref } from './ref';

const fiberKey = Symbol();

export enum FiberTag {
  HostRoot,
  HostComponent,
  HostText,
  HostPortal,
  FunctionComponent,
  Fragment,
  Context,
}

const effectTagCounter = new FlagGenerator();
export enum EffectTag {
  None = effectTagCounter.next(),
  Placement = effectTagCounter.next(),
  Update = effectTagCounter.next(),
  Lifecycle = effectTagCounter.next(),
  Deletion = effectTagCounter.next(),
  ContentReset = effectTagCounter.next(),
  Re = effectTagCounter.next(),
}

class Fiber {
  public tag: FiberTag;
  public type: FiberType | null;
  public key: FiberKey;
  public ref: Ref | null;
  public stateNode: HTMLElement | null;
  public return: Fiber | null;
  public child: Fiber | null;
  public sibling: Fiber | null;
  public index: number;
  public pendingProps: FiberProps;
  public memoizedProps: FiberProps | null;
  public memoizedState: unknown;
  public fullContext: object | null;
  public contextTypes: Array<unknown> | null;
  public memoizedContext: object | null;
  public memoizedStyle: object | null;
  public updateQueue: Array<unknown> | null;
  public effectTag: EffectTag;
  public deletions: Array<Fiber> | null;

  public alternate: Fiber | null;

  constructor(tag: FiberTag, pendingProps: FiberProps, key: FiberKey) {
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
    this.effectTag = EffectTag.None;
    this.deletions = null;

    this.alternate = null;
  }
}

export function createFiber(
  tag: FiberTag,
  pendingProps: FiberProps,
  key: FiberKey,
): Fiber {
  return new Fiber(tag, pendingProps, key);
}

export function createWorkInProgress(
  current: Fiber,
  pendingProps: FiberProps,
): Fiber {
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

    workInProgress.effectTag = EffectTag.None;
    workInProgress.deletions = [];
  }

  return workInProgress;
}

export function createFiberFromElement(element: Element): Fiber {
  const fiber = createFiber(element.tag, element.props, element.key);
  fiber.type = element.type;
  fiber.ref = element.ref;
  return fiber;
}

export function markInstanceFiber(node: HTMLElement, fiber: Fiber) {
  // @ts-expect-error Conversion to any
  node[fiberKey] = fiber;
}

export function unmarkInstanceFiber(node: HTMLElement) {
  // @ts-expect-error Conversion to any
  node[fiberKey] = null;
}

export function getInstanceFiber(node: HTMLElement): Fiber {
  // @ts-expect-error Conversion to any
  return node[fiberKey];
}
