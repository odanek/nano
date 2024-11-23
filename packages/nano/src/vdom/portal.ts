import { NanoElement } from './element';
import { NanoChildrenProps } from './type';

export type NanoPortalProps = {
  container: HTMLElement | SVGElement;
} & NanoChildrenProps;

export function NanoPortal(
  props: NanoPortalProps,
): NanoElement<NanoPortalProps> {
  return NanoElement.portal(props, null);
}
