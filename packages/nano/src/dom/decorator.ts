import { NanoElement } from '../vdom/element';
import { type NanoChildrenProps, type NanoKeyProps } from '../vdom/type';
import { type NanoDomClass, type NanoDomStyle } from './type';

// TODO Just style decorator?
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
