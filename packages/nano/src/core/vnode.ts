import type { Context, ContextProps } from '../api/context';
import type { DecoratorProps } from '../api/decorator';
import type { FragmentProps } from '../api/fragment';
import type { Key } from '../api/key';
import type { PortalProps } from '../api/portal';
import type { Ref } from '../api/ref';
import type { Component } from '../api/renderable';
import {
  VNodeKind,
  type ComponentVNode,
  type ContextVNode,
  type DecoratorVNode,
  type ElementVNode,
  type FragmentVNode,
  type PortalVNode,
  type TextVNode,
  type VNode,
} from '../api/vnode';

export class VNodeImpl<V extends VNode> {
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

export function createPortalVNode<Container extends Element>(
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
