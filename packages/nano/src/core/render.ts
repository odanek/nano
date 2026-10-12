import type { Renderable } from '../api/renderable';
import { FiberRoot } from './root';

export function render(element: Renderable, container: HTMLElement): FiberRoot {
  const root = new FiberRoot(container);
  root.render(element);
  return root;
}
