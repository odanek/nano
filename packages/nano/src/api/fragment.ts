import type { PropsWithKey } from './key';
import type { PropsWithChildren, Renderable } from './renderable';
import type { FragmentVNode } from './vnode';
import { createFragmentVNode } from '../core/vnode';
import { emptyArray } from '../shared/array';
import { isIterable, isValue } from '../shared/predicate';

export type FragmentProps = PropsWithKey<{
  children: Iterable<Renderable>;
}>;

// Move to core?
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
