import { NanoNode } from './type';
import { NanoFiberRoot } from './fiber-root';

export function render(
  element: NanoNode,
  container: HTMLElement,
): NanoFiberRoot {
  const root = new NanoFiberRoot(container);
  root.render(element);
  return root;
}
