import type { VNode } from './vnode';

export type Empty = null;
export type Primitive = string | number;
export type Renderable = VNode | Primitive | Empty | Iterable<Renderable>;
export type Component<P = unknown> = (props: P) => Renderable;

export type PropsWithChildren<P = unknown> = P & {
  children?: Renderable | undefined;
};
