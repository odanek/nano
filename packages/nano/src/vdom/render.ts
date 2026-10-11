import type { Renderable } from '../core/renderable';
import { FiberRoot } from './fiber-root';

export function render(element: Renderable, container: HTMLElement): FiberRoot {
  const root = new FiberRoot(container);
  root.render(element);
  return root;
}
