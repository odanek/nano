import { NanoElement } from '../element';
import { type NanoChildrenProps, type NanoKeyProps } from '../type';
import { type NanoDomClass, type NanoDomStyle } from './type';

export type NanoDecoratorProps = NanoChildrenProps &
  NanoKeyProps & {
    class?: NanoDomClass | undefined;
    style?: NanoDomStyle | undefined;
  };

export function NanoDecorator(
  props: NanoDecoratorProps,
): NanoElement<NanoDecoratorProps> {
  return NanoElement.decorator(props, null);
}
