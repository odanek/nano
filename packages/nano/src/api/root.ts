import type { Renderable } from "../core/renderable";

export interface Root {
  render(node: Renderable): void;
  unmount(): void;
}

// export function createRoot(container: Element): Root;
// export function render(node: Renderable, container: Element): Root;