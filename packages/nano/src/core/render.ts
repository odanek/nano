import type { Renderable } from '../api/renderable';
import type { Root } from '../api/root';
import { RootImpl } from './root';

export function render(element: Renderable, container: HTMLElement): Root {
  const root = new RootImpl(container);
  root.render(element);
  return root;
}
