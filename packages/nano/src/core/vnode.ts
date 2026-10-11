import type { Context, ContextProps } from './context';
import type { DecoratorProps } from './decorator';
import type { FragmentProps } from './fragment';
import type { Key } from './key';
import type { PortalProps } from './portal';
import type { Ref } from './ref';
import type { Component } from './renderable';

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
  readonly type: null;
  readonly key: Key | null;
  readonly ref: null;
  readonly props: DecoratorProps<D>;
}

// TODO Where to put the impls?
class VNodeImpl<V extends VNode> {
  public kind: V['kind'];
  public type: V['type'];
  public key: V['key'];
  public ref: V['ref'];
  public props: V['props'];

  constructor(
    kind: V['kind'],
    type: V['type'],
    key: V['key'],
    ref: V['ref'],
    props: V['props'],
  ) {
    this.kind = kind;
    this.type = type;
    this.key = key;
    this.ref = ref;
    this.props = props;
    Object.freeze(this);
  }
}

export function createTextVNode(text: string): TextVNode {
  return new VNodeImpl<TextVNode>(VNodeKind.Text, null, null, null, text);
}

export function createElementVNode<P>(
  type: string,
  props: P,
  ref: Ref | null,
  key: Key | null,
): ElementVNode {
  return new VNodeImpl<ElementVNode>(VNodeKind.Element, type, key, ref, props);
}

export function createComponentVNode<P>(
  type: Component<P>,
  props: P,
  key: Key | null,
): ComponentVNode<P> {
  return new VNodeImpl<ComponentVNode<P>>(
    VNodeKind.Component,
    type,
    key,
    null,
    props,
  );
}

export function createContextVNode<T>(
  context: Context<T>,
  props: ContextProps<T>,
): ContextVNode<T> {
  return new VNodeImpl<ContextVNode<T>>(
    VNodeKind.Context,
    context,
    null,
    null,
    props,
  );
}

export function createFragmentVNode(
  props: FragmentProps,
  key: Key | null,
): FragmentVNode {
  return new VNodeImpl<FragmentVNode>(
    VNodeKind.Fragment,
    null,
    key,
    null,
    props,
  );
}

export function createPortalVNode<Container>(
  props: PortalProps<Container>,
  key: Key | null,
): VNodeImpl<PortalVNode<Container>> {
  return new VNodeImpl<PortalVNode<Container>>(
    VNodeKind.Portal,
    props.container,
    key,
    null,
    props,
  );
}

export function createDecoratorVNode<D>(
  props: DecoratorProps<D>,
  key: Key | null,
): DecoratorVNode<D> {
  return new VNodeImpl<DecoratorVNode<D>>(
    VNodeKind.Decorator,
    null,
    key,
    null,
    props,
  );
}
