import { NanoElement, type NanoElementKey, NanoElementTag } from '../element';
import {
  createFiberFromElement,
  createWorkInProgress,
  NanoFiber,
} from '../fiber';
import { type NanoNode } from '../type';
import { type NanoFragmentProps } from '../fragment';
import { NanoEffectTag } from '../effect';
import { isArray, isIterable, isNumber, isString, isValue } from '../../util';

type NanoReconciler = (
  returnFiber: NanoFiber,
  currentFirstChild: NanoFiber | null,
  element: unknown,
) => NanoFiber<unknown> | null;

export function cloneChildFibers(
  current: NanoFiber,
  workInProgress: NanoFiber,
): void {
  if (current.child === null) {
    return;
  }

  let currentChild = current.child;
  let newChild = createWorkInProgress(currentChild, currentChild.pendingProps);
  newChild.return = workInProgress;
  newChild.ref = currentChild.ref;
  workInProgress.child = newChild;

  while (currentChild.sibling !== null) {
    currentChild = currentChild.sibling;
    const newSibling = createWorkInProgress(
      currentChild,
      currentChild.pendingProps,
    );
    newSibling.return = workInProgress;
    newSibling.ref = currentChild.ref;
    newSibling.index = currentChild.index;
    newChild.sibling = newSibling;
    newChild = newSibling;
  }
}

function mapRemainingChildren(
  returnFiber: NanoFiber,
  currentFirstChild: NanoFiber,
): Map<NanoElementKey, NanoFiber> {
  const existingChildren = new Map();

  let existingChild: NanoFiber | null = currentFirstChild;
  while (existingChild !== null) {
    if (existingChild.key !== null) {
      existingChildren.set(existingChild.key, existingChild);
    } else {
      existingChildren.set(existingChild.index, existingChild);
    }
    existingChild = existingChild.sibling;
  }
  return existingChildren;
}

function updateElement(
  returnFiber: NanoFiber,
  current: NanoFiber | null,
  element: NanoElement,
): NanoFiber {
  if (
    current !== null &&
    current.tag === element.tag &&
    current.type === element.type
  ) {
    // Update
    const existing = createWorkInProgress(current, element.props);
    existing.ref = element.ref;
    existing.return = returnFiber;
    return existing;
  } else {
    const created = createFiberFromElement(element); // Insert
    created.return = returnFiber;
    return created;
  }
}

function coerceElement(element: unknown): NanoElement {
  if (element instanceof NanoElement) {
    return element;
  } else if (isString(element) || isNumber(element)) {
    return NanoElement.text(element.toString()) as NanoElement<unknown>;
  } else if (isArray(element) || isIterable(element)) {
    return NanoElement.fragment(
      { children: element as NanoNode[] },
      null,
    ) as NanoElement<unknown>;
  } else {
    throw new Error('Invalid virtual dom node: ' + element);
  }
}

function createChild(
  returnFiber: NanoFiber,
  element: unknown,
): NanoFiber | null {
  if (element === null || element === undefined) {
    return null;
  }

  const coercedElement = coerceElement(element);
  const fiber = createFiberFromElement(coercedElement);
  fiber.return = returnFiber;
  return fiber;
}

function updateSlot(
  returnFiber: NanoFiber,
  oldFiber: NanoFiber | null,
  element: unknown,
): NanoFiber | null {
  if (element === null || element === undefined) {
    return null;
  }

  const key = oldFiber !== null ? oldFiber.key : null;
  const coercedElement = coerceElement(element);
  return coercedElement.key === key
    ? updateElement(returnFiber, oldFiber, coercedElement)
    : null;
}

function updateFromMap(
  existingChildren: Map<NanoElementKey, NanoFiber>,
  returnFiber: NanoFiber,
  newIdx: number,
  element: unknown,
): NanoFiber | null {
  if (element === null || element === undefined) {
    return null;
  }

  const coercedElement = coerceElement(element);
  const key = coercedElement.key ?? newIdx;
  const matchedFiber = existingChildren.get(key) ?? null;
  return updateElement(returnFiber, matchedFiber, coercedElement);
}

function childReconciler(shouldTrackSideEffects: boolean): NanoReconciler {
  function deleteChild(returnFiber: NanoFiber, childToDelete: NanoFiber): void {
    if (!shouldTrackSideEffects) {
      return;
    }

    const deletions = returnFiber.deletions;
    if (deletions === null) {
      returnFiber.deletions = [childToDelete];
      returnFiber.effectTag |= NanoEffectTag.Deletion;
    } else {
      deletions.push(childToDelete);
    }
  }

  function deleteRemainingChildren(
    returnFiber: NanoFiber,
    currentFirstChild: NanoFiber | null,
  ): null {
    if (!shouldTrackSideEffects) {
      return null;
    }

    let childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null;
  }

  function placeChild(
    newFiber: NanoFiber,
    lastPlacedIndex: number,
    newIndex: number,
  ): number {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      return lastPlacedIndex;
    }

    const current = newFiber.alternate;
    if (current !== null) {
      const oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        // Move
        newFiber.effectTag = NanoEffectTag.Placement;
        return lastPlacedIndex;
      } else {
        return oldIndex;
      }
    } else {
      // Insertion
      newFiber.effectTag = NanoEffectTag.Placement;
      return lastPlacedIndex;
    }
  }

  function placeSingleChild(newFiber: NanoFiber): NanoFiber {
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.effectTag = NanoEffectTag.Placement;
    }
    return newFiber;
  }

  function reconcileChildren(
    returnFiber: NanoFiber,
    currentFirstChild: NanoFiber | null,
    newChildrenIterable: Iterable<NanoNode>,
  ): NanoFiber | null {
    const iteratorFn = newChildrenIterable[Symbol.iterator];
    const newChildren = iteratorFn.call(newChildrenIterable);
    let resultingFirstChild = null;
    let previousNewFiber = null;
    let oldFiber = currentFirstChild;
    let lastPlacedIndex = 0;
    let newIdx = 0;
    let nextOldFiber = null;

    let step = newChildren.next();
    for (
      ;
      oldFiber !== null && !step.done;
      newIdx++, step = newChildren.next()
    ) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      const newFiber = updateSlot(returnFiber, oldFiber, step.value);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        resultingFirstChild = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (step.done) {
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      for (; !step.done; newIdx++, step = newChildren.next()) {
        const newFiber = createChild(returnFiber, step.value);
        if (newFiber === null) {
          continue;
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
      return resultingFirstChild;
    }

    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    for (; !step.done; newIdx++, step = newChildren.next()) {
      const newFiber = updateFromMap(
        existingChildren,
        returnFiber,
        newIdx,
        step.value,
      );
      if (newFiber !== null) {
        if (shouldTrackSideEffects) {
          if (newFiber.alternate !== null) {
            existingChildren.delete(
              newFiber.key === null ? newIdx : newFiber.key,
            );
          }
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
    }

    if (shouldTrackSideEffects) {
      existingChildren.forEach((child) => deleteChild(returnFiber, child));
    }

    return resultingFirstChild;
  }

  function reconcileSingleElement(
    returnFiber: NanoFiber,
    currentFirstChild: NanoFiber | null,
    element: NanoElement,
  ): NanoFiber {
    const key = element.key;
    let child = currentFirstChild;
    while (child !== null) {
      if (
        child.key !== key ||
        child.tag !== element.tag ||
        child.type !== element.type
      ) {
        deleteChild(returnFiber, child);
      } else {
        deleteRemainingChildren(returnFiber, child.sibling);
        const existing = createWorkInProgress(child, element.props);
        existing.ref = element.ref;
        existing.return = returnFiber;
        return existing;
      }
      child = child.sibling;
    }

    const created = createFiberFromElement(element);
    created.return = returnFiber;
    return created;
  }

  function reconcileChildFibers(
    returnFiber: NanoFiber,
    currentFirstChild: NanoFiber | null,
    element: unknown,
  ): NanoFiber | null {
    if (isValue(element)) {
      const coercedElement = coerceElement(element);
      if (
        coercedElement.tag === NanoElementTag.Fragment &&
        coercedElement.key === null
      ) {
        const props = coercedElement.props as NanoFragmentProps;
        return reconcileChildren(
          returnFiber,
          currentFirstChild,
          props.children,
        );
      } else {
        return placeSingleChild(
          reconcileSingleElement(
            returnFiber,
            currentFirstChild,
            coercedElement,
          ),
        );
      }
    } else if (element === undefined) {
      const parentTag = returnFiber.tag;
      if (parentTag === NanoElementTag.FunctionComponent) {
        throw new Error(
          'Nothing was returned from render. You may miss a return statement or, to render nothing, return null.',
        );
      }
      return deleteRemainingChildren(returnFiber, currentFirstChild);
    } else if (element === null) {
      return deleteRemainingChildren(returnFiber, currentFirstChild);
    } else {
      throw new Error('Invalid virtual node type: ' + element);
    }
  }

  return reconcileChildFibers;
}

export const reconcileChildFibers: NanoReconciler = childReconciler(true);
export const mountChildFibers: NanoReconciler = childReconciler(false);
