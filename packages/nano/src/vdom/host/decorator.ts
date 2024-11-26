import { NanoElement } from '../element';
import { NanoChildrenProps, NanoKeyProps } from '../type';
import { NanoDomClass, NanoDomStyle } from './type';

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
