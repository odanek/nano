import type { PropsWithChildren } from './renderable';
import { createPortalVNode, type PortalVNode } from './vnode';

export type PortalProps<Container = unknown> = PropsWithChildren<{
  container: Container;
}>;

export function Portal(props: PortalProps): PortalVNode {
  return createPortalVNode(props, null);
}
