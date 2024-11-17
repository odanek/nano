import { NanoEvent } from './event';
import { NanoEventType } from './type';

export type NanoFocusEventType = NanoEventType.FocusIn | NanoEventType.FocusOut;

export class NanoFocusEvent<T> extends NanoEvent<FocusEvent, T> {
  public readonly relatedTarget: EventTarget | null;

  constructor(event: FocusEvent) {
    super(event);
    this.relatedTarget = event.relatedTarget;
  }

  static getType(type: string): NanoFocusEventType {
    switch (type) {
      default:
        throw new Error(`Event type ${type} is not a focus event`);
    }
  }
}
