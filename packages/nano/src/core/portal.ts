import type { PropsWithChildren } from './renderable';
import { createPortalVNode, type PortalVNode } from './vnode';

export type PortalProps<Container = unknown> = PropsWithChildren<{
  container: Container;
}>;

export function Portal<Container extends Element>(
  props: PortalProps<Container>,
): PortalVNode<Container> {
  return createPortalVNode(props, null);
}
