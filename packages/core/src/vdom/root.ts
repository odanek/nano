import { performSyncWorkOnRoot } from './work-loop';
import { createFiber, NanoFiber } from './fiber';
import { NanoEventDispatcher } from '../event/dispatcher';
import { NanoElementTag, NanoNode } from './type.js';

export class NanoFiberRoot {
  public readonly container: Element;
  private current: NanoFiber<null>;
  private workInProgress: NanoFiber<null> | null;
  private updateHandle: number | null;
  private disposed: boolean;
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

  render(element: NanoNode) {
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

  scheduleUpdate() {
    if (this.updateHandle === null) {
      this.updateHandle = requestAnimationFrame(() => {
        this.updateHandle = null;
        performSyncWorkOnRoot(this);
      });
    }
  }

  forceUpdate() {
    if (this.updateHandle !== null) {
      this.cancelUpdate();
      performSyncWorkOnRoot(this);
    }
  }

  dispose() {
    this.dispatcher.disconnect(this.container);
    this.render(null);
    this.cancelUpdate();
    this.disposed = true;
  }

  private cancelUpdate() {
    if (this.updateHandle !== null) {
      cancelAnimationFrame(this.updateHandle);
      this.updateHandle = null;
    }
  }
}
