import type { Renderable } from './renderable';

export interface Root {
  render(node: Renderable): void;
  unmount(): void;
}
