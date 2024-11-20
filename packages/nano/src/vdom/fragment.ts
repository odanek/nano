import { emptyArray, isIterable, isValue } from '../util';
import { NanoElement } from './element';
import { NanoChildrenProps, NanoKeyProps, NanoNode } from './type';

export type NanoFragmentProps = NanoKeyProps & {
  children: Iterable<NanoNode>;
};

export function NanoFragment({
  children,
}: NanoKeyProps & NanoChildrenProps): NanoElement<NanoFragmentProps> {
  const coercedChildren = isIterable(children)
    ? children
    : isValue(children)
      ? [children]
      : emptyArray;
  return NanoElement.fragment({ children: coercedChildren }, null);
}
