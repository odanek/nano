import { NanoElement } from '../element';
import { NanoChildrenProps, NanoKeyProps } from '../type';
import { NanoDomClassPropValue, NanoDomStylePropValue } from './type';

export type NanoDecoratorProps = NanoChildrenProps &
  NanoKeyProps & {
    class?: NanoDomClassPropValue | undefined;
    style?: NanoDomStylePropValue | undefined;
  };

export function NanoDecorator(
  props: NanoDecoratorProps,
): NanoElement<NanoDecoratorProps> {
  return NanoElement.decorator(props, null);
}
