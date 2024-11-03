import {
  isAnyOf,
  isElement,
  isInstanceOf,
  isNull,
  isNumber,
  isString,
} from '@nano-ui/type';
import { NanoElement } from './element';
import { NanoNode } from './type';
import { NanoFiberRoot } from './fiber-root';

const isValidElement = isAnyOf(
  isInstanceOf(NanoElement),
  isString,
  isNumber,
  isNull,
);

export function render(element: NanoNode, container: HTMLElement) {
  if (!isValidElement(element)) {
    throw new Error('Virtual element expected in render');
  }
  if (!isElement(container)) {
    throw new Error('Invalid container element, HTMLElement expected');
  }

  const root = new NanoFiberRoot(container);
  root.render(element);
  return root;
}
