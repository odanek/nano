import { performSyncWorkOnRoot } from './work-loop.js';
import { createFiber, NanoFiber } from './fiber.js';
import { NanoEventDispatcher } from '../event/dispatcher.js';
import { NanoNode } from './type.js';
import { NanoElement, NanoElementTag } from './element.js';

export type NanoFiberRootProps = null;

export type NanoFiberRootState = {
  element: NanoElement;
};

export class NanoFiberRoot {
  public readonly container: Element;
  public current: NanoFiber<NanoFiberRootProps>;
  public workInProgress: NanoFiber<NanoFiberRootProps> | null;
  public disposed: boolean;
  private updateHandle: number | null;
  private dispatcher: NanoEventDispatcher;

  constructor(container: Element) {
    const fiber = createFiber(NanoElementTag.HostRoot, null, null);
    fiber.stateNode = this;
    fiber.memoizedState = {};

    this.container = container;
    this.current = fiber;
    this.workInProgress = null;
    this.updateHandle = null;
    this.disposed = false;

    this.dispatcher = new NanoEventDispatcher();
    this.dispatcher.connect(container);
  }

  render(element: NanoNode): void {
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
