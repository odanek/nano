import { isIterable, isValue } from '@nano-ui/type';
import { NanoElement } from './element';
import { NanoChildrenProps, NanoKeyProps, NanoNode } from './type';
import { emptyArray } from '@nano-ui/util';

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
