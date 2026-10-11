import type { PropsWithKey } from './key';
import type { PropsWithChildren } from './renderable';

export type DecoratorProps<D = unknown> = PropsWithKey<PropsWithChildren<D>>;
