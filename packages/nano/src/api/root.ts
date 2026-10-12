import type { Renderable } from './renderable';

// TODO
export interface Root {
  render(node: Renderable): void;
  unmount(): void;
}

// export function createRoot(container: Element): Root;
// export function render(node: Renderable, container: Element): Root;
