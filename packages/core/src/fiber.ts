import { FlagGenerator } from '@nano-ui/util';
import {
  NanoElementTag,
  NanoElementKey,
  NanoElementProps,
  NanoElementType,
} from './type';
import { NanoElement } from './element';
import { NanoRef } from './ref';

const fiberKey = Symbol();

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

class NanoFiber {
  public tag: NanoElementTag;
  public type: NanoElementType | null;
  public key: NanoElementKey;
  public ref: NanoRef | null;
  public stateNode: HTMLElement | null;
  public return: NanoFiber | null;
  public child: NanoFiber | null;
  public sibling: NanoFiber | null;
  public index: number;
  public pendingProps: NanoElementProps;
  public memoizedProps: NanoElementProps | null;
  public memoizedState: unknown;
  public fullContext: object | null;
  public contextTypes: Array<unknown> | null;
  public memoizedContext: object | null;
  public memoizedStyle: object | null;
  public updateQueue: Array<unknown> | null;
  public effectTag: EffectTag;
  public deletions: Array<NanoFiber> | null;

  public alternate: NanoFiber | null;

  constructor(
    tag: NanoElementTag,
    pendingProps: NanoElementProps,
    key: NanoElementKey,
  ) {
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
  tag: NanoElementTag,
  pendingProps: NanoElementProps,
  key: NanoElementKey,
): NanoFiber {
  return new NanoFiber(tag, pendingProps, key);
}

export function createWorkInProgress(
  current: NanoFiber,
  pendingProps: NanoElementProps,
): NanoFiber {
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

export function createFiberFromElement(element: NanoElement): NanoFiber {
  const fiber = createFiber(element.tag, element.props, element.key);
  fiber.type = element.type;
  fiber.ref = element.ref;
  return fiber;
}

export function markInstanceFiber(node: HTMLElement, fiber: NanoFiber) {
  // @ts-expect-error Conversion to any
  node[fiberKey] = fiber;
}

export function unmarkInstanceFiber(node: HTMLElement) {
  // @ts-expect-error Conversion to any
  node[fiberKey] = null;
}

export function getInstanceFiber(node: HTMLElement): NanoFiber {
  // @ts-expect-error Conversion to any
  return node[fiberKey];
}
