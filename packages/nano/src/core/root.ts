import { performSyncWorkOnRoot } from '../reconciler/work-loop.js';
import { createFiber, Fiber } from '../reconciler/fiber.js';
import { EventDispatcher } from '../dom/dispatcher.js';
import { VNodeKind } from '../api/vnode.js';
import type { Renderable } from '../api/renderable.js';
import type { Root } from '../api/root.js';

export type RootProps = null;

export type RootState = {
  element: Renderable;
};

export class RootImpl implements Root {
  public readonly container: Element;
  public current: Fiber<RootProps>;
  public workInProgress: Fiber<RootProps> | null;
  public mounted: boolean;
  public dispatcher: EventDispatcher;
  private updateHandle: number | null;

  constructor(container: Element) {
    const fiber = createFiber(VNodeKind.Root, null, null);
    fiber.stateNode = this;
    fiber.memoizedState = {};

    this.container = container;
    this.current = fiber;
    this.workInProgress = null;
    this.updateHandle = null;
    this.mounted = true;

    this.dispatcher = new EventDispatcher();
    this.dispatcher.connect(container);
  }

  render(element: Renderable): void {
    this.cancelUpdate();

    const update = { element };
    const fiber = this.current;
    if (fiber.updateQueue === null) {
      fiber.updateQueue = [update];
    } else {
      fiber.updateQueue[0] = update;
    }
    performSyncWorkOnRoot(this);
  }

  scheduleUpdate(): void {
    if (this.updateHandle === null) {
      this.updateHandle = requestAnimationFrame(() => {
        this.updateHandle = null;
        performSyncWorkOnRoot(this);
      });
    }
  }

  forceUpdate(): void {
    if (this.updateHandle !== null) {
      this.cancelUpdate();
      performSyncWorkOnRoot(this);
    }
  }

  unmount(): void {
    this.dispatcher.disconnect(this.container);
    this.render(null);
    this.cancelUpdate();
    this.mounted = true;
  }

  private cancelUpdate(): void {
    if (this.updateHandle !== null) {
      cancelAnimationFrame(this.updateHandle);
      this.updateHandle = null;
    }
  }
}
