import type { PropsWithKey } from './key';
import type { PropsWithChildren } from './renderable';
import { type ContextVNode } from './vnode';

export type Context<T = unknown> = (props: ContextProps<T>) => ContextVNode<T>;
export type ContextProps<T = unknown> = PropsWithKey<
  PropsWithChildren<{ value: T }>
>;
