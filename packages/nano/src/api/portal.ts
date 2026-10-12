import type { PropsWithChildren } from './renderable';
import type { PortalVNode } from './vnode';
import { createPortalVNode } from '../core/vnode';

export type PortalProps<Container = unknown> = PropsWithChildren<{
  container: Container;
}>;

export function Portal<Container extends Element>(
  props: PortalProps<Container>,
): PortalVNode<Container> {
  return createPortalVNode(props, null);
}
