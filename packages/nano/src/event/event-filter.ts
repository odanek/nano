import { type NanoDomEventProps } from '../vdom/host/type';
import { type NanoChildrenProps, type NanoNode } from '../vdom/type';

type NanoEventFilterProps = NanoDomEventProps<Element> & NanoChildrenProps;

// TODO TS does not allow the return value to be NanoChildren
export function NanoEventFilter(props: NanoEventFilterProps): NanoNode {
  return (props.children ?? null) as NanoNode;
}
