import type { Component, PropsWithChildren } from './renderable';

export type Context<T = unknown> = Component<ContextProps<T>>;
export type ContextProps<T = unknown> = PropsWithChildren<{ value: T }>;
