import type { DecoratorProps } from '../core/decorator';
import { createDecoratorVNode, type DecoratorVNode } from '../core/vnode';
import { type NanoDomStyle } from './type';

export type StyleDecoratorProps = DecoratorProps<{
  style?: NanoDomStyle | undefined;
}>;

export function StyleDecorator(
  props: StyleDecoratorProps,
): DecoratorVNode<StyleDecoratorProps> {
  return createDecoratorVNode(props, null);
}
