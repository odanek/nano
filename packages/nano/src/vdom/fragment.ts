import { isIterable, isValue } from '../shared/predicate';
import { emptyArray } from '../shared/array';
import { NanoElement } from './element';
import {
  type NanoChildrenProps,
  type NanoKeyProps,
  type NanoNode,
} from './type';

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
