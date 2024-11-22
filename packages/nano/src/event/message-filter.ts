import { NanoDomEventProps } from '../vdom/host/type';
import { NanoChildrenProps, NanoNode } from '../vdom/type';

type NanoMessageFilterProps = NanoDomEventProps<Element> & NanoChildrenProps;

// TODO TS does not allow the return value to be NanoChildren
export function NanoMessageFilter(props: NanoMessageFilterProps): NanoNode {
  return (props.children ?? null) as NanoNode;
}
