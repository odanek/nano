import { performSyncWorkOnRoot } from '../reconciler/work-loop.js';
import { createFiber, Fiber } from '../reconciler/fiber.js';
import { EventDispatcher } from '../dom/dispatcher.js';
import { VNodeKind } from '../api/vnode.js';
import type { Renderable } from '../api/renderable.js';

export type NanoFiberRootProps = null;

export type NanoFiberRootState = {
  element: Renderable;
};

// Rename to RootImpl
export class FiberRoot {
  public readonly container: Element;
  public current: Fiber<NanoFiberRootProps>;
  public workInProgress: Fiber<NanoFiberRootProps> | null;
  public disposed: boolean;
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
    this.disposed = false;

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

  dispose(): void {
    this.dispatcher.disconnect(this.container);
    this.render(null);
    this.cancelUpdate();
    this.disposed = true;
  }

  private cancelUpdate(): void {
    if (this.updateHandle !== null) {
      cancelAnimationFrame(this.updateHandle);
      this.updateHandle = null;
    }
  }
}
