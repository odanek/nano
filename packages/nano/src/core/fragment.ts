import type { PropsWithKey } from './key';
import type { PropsWithChildren, Renderable } from './renderable';
import { createFragmentVNode, type FragmentVNode } from './vnode';
import { emptyArray } from '../shared/array';
import { isIterable, isValue } from '../shared/predicate';

export type FragmentProps = PropsWithKey<{
  children: Iterable<Renderable>;
}>;

export function Fragment({
  children,
  key,
}: PropsWithKey<PropsWithChildren>): FragmentVNode {
  const coercedChildren = isIterable(children)
    ? children
    : isValue(children)
      ? [children]
      : emptyArray;
  return createFragmentVNode({ children: coercedChildren }, key);
}
