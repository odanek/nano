import type { Context, ContextProps } from './context';
import type { Key } from './key';
import type { Ref } from './ref';
import type { Component, PropsWithChildren } from './renderable';

export const VNodeKind = {
  Root: 0,
  Element: 1,
  Text: 2,
  Component: 3,
  Context: 4,
  Fragment: 5,
  Portal: 6,
  Decorator: 7,
};

export type VNode =
  | RootVNode
  | ElementVNode
  | TextVNode
  | ComponentVNode
  | ContextVNode
  | FragmentVNode
  | PortalVNode
  | DecoratorVNode;

export interface RootVNode {
  readonly kind: typeof VNodeKind.Root;
  readonly type: null;
  readonly key: null;
  readonly ref: null;
  readonly props: null;
}

export interface ElementVNode<P = unknown, Element = unknown> {
  readonly kind: typeof VNodeKind.Element;
  readonly type: string;
  readonly key: Key | null;
  readonly ref: Ref<Element | null> | null;
  readonly props: P;
}

export interface TextVNode {
  readonly kind: typeof VNodeKind.Text;
  readonly type: null;
  readonly key: null;
  readonly ref: null;
  readonly props: string;
}

export interface ComponentVNode<P = unknown> {
  readonly kind: typeof VNodeKind.Component;
  readonly type: Component<P>;
  readonly key: Key | null;
  readonly ref: null;
  readonly props: P;
}

export interface ContextVNode<T = unknown> {
  readonly kind: typeof VNodeKind.Context;
  readonly type: Context<T>;
  readonly props: ContextProps<T>;
  readonly key: Key | null;
  readonly ref: null;
}

export interface FragmentVNode {
  readonly kind: typeof VNodeKind.Fragment;
  readonly type: null;
  readonly props: FragmentProps;
  readonly key: Key | null;
  readonly ref: null;
}

export interface PortalVNode<Container = unknown> {
  readonly kind: typeof VNodeKind.Portal;
  readonly type: Container;
  readonly key: Key | null;
  readonly ref: null;
  readonly props: PortalProps<Container>;
}

export interface DecoratorVNode<D = unknown> {
  readonly kind: typeof VNodeKind.Decorator;
  readonly type: string;
  readonly key: Key | null;
  readonly ref: null;
  readonly props: DecoratorProps<D>;
}

export type FragmentProps = PropsWithChildren;
export type PortalProps<Container = unknown> = PropsWithChildren<{ target: Container }>;
export type DecoratorProps<D = unknown> = PropsWithChildren<D>;
