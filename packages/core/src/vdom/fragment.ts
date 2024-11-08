import { isIterable, isValue } from '@nano-ui/type';
import { NanoElement } from './element';
import { NanoChildrenProp, NanoKeyProp, NanoNode } from './type';
import { emptyArray } from '@nano-ui/util';

export type NanoFragmentProps = NanoKeyProp & {
  children: Iterable<NanoNode>;
};

export function NanoFragment({
  children,
}: NanoKeyProp & NanoChildrenProp): NanoElement<NanoFragmentProps> {
  const coercedChildren = isIterable(children)
    ? children
    : isValue(children)
      ? [children]
      : emptyArray;
  return NanoElement.fragment({ children: coercedChildren }, null);
}
