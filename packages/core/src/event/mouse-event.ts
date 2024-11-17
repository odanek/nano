import { NanoEvent } from './event';

export class NanoMouseEvent<E extends MouseEvent, T> extends NanoEvent<E, T> {
  constructor(event: E) {
    super(event);
  }
}
