import { NanoEvent } from './event';

export class NanoInputEvent<T> extends NanoEvent<InputEvent, T> {
  public readonly data: string | null;
  public readonly dataTransfer: DataTransfer | null;
  // readonly inputType: string;
  public readonly isComposing: boolean;
  // getTargetRanges(): StaticRange[];

  constructor(event: InputEvent) {
    super(event);
    this.data = event.data;
    this.dataTransfer = event.dataTransfer;
    this.isComposing = event.isComposing;
  }
}
