import type { PropsWithKey } from "./key";
import type { PropsWithChildren } from "./renderable";
import { createFragmentVNode, type FragmentVNode } from "./vnode";
import { emptyArray } from "../shared/array";
import { isIterable, isValue } from "../shared/predicate";

export type FragmentProps = PropsWithKey<PropsWithChildren>;

export function Fragment({
  children,
}: FragmentProps): FragmentVNode {
  const coercedChildren = isIterable(children)
    ? children
    : isValue(children)
      ? [children]
      : emptyArray;
  return createFragmentVNode({ children: coercedChildren }, null);
}
