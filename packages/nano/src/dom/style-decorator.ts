import type { DecoratorProps } from '../api/decorator';
import { type DecoratorVNode } from '../api/vnode';
import { createDecoratorVNode } from '../core/vnode';
import { type NanoDomStyle } from './type';

export type StyleDecoratorProps = DecoratorProps<{
  style?: NanoDomStyle | undefined;
}>;

export function StyleDecorator(
  props: StyleDecoratorProps,
): DecoratorVNode<StyleDecoratorProps> {
  return createDecoratorVNode(props, null);
}
