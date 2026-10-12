import type { Context, ContextProps } from '../api/context';
import type { DecoratorProps } from '../api/decorator';
import type { FragmentProps } from './fragment';
import type { Key } from '../api/key';
import type { PortalProps } from './portal';
import type { Ref } from '../api/ref';
import type { Component } from '../api/renderable';

export const VNodeKind = {
  Root: 0,
  Element: 1,
  Text: 2,
  Component: 3,
  Context: 4,
  Fragment: 5,
  Portal: 6,
  Decorator: 7,
} as const;

export type VNode =
  | RootVNode
  | ElementVNode
  | TextVNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ComponentVNode<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ContextVNode<any>
  | FragmentVNode
  | PortalVNode<Element>
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

export interface ComponentVNode<P> {
  readonly kind: typeof VNodeKind.Component;
  readonly type: Component<P>;
  readonly key: Key | null;
  readonly ref: null;
  readonly props: P;
}

export interface ContextVNode<T> {
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

export interface PortalVNode<Container extends Element> {
  readonly kind: typeof VNodeKind.Portal;
  readonly type: Container;
  readonly key: Key | null;
  readonly ref: null;
  readonly props: PortalProps<Container>;
}

export interface DecoratorVNode<D = unknown> {
  readonly kind: typeof VNodeKind.Decorator;
  readonly type: null;
  readonly key: Key | null;
  readonly ref: null;
  readonly props: DecoratorProps<D>;
}
