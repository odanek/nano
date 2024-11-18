import { NanoEvent } from './event';

export class NanoInputEvent<T> extends NanoEvent<InputEvent, T> {
  public readonly data: string | null;
  public readonly dataTransfer: DataTransfer | null;
  public readonly inputType: string;
  public readonly isComposing: boolean;

  constructor(event: InputEvent) {
    super(event);
    this.data = event.data;
    this.dataTransfer = event.dataTransfer;
    this.inputType = event.inputType;
    this.isComposing = event.isComposing;
  }

  public getTargetRanges(): StaticRange[] {
    return this.nativeEvent.getTargetRanges();
  }
}
