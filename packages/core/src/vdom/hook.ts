import { Counter } from "@nano-ui/util";

export class NanoHook<P = unknown> {
    public tag: NanoHookTag;
    public next: NanoHook | null;
    public payload: P | null;

	constructor(tag: NanoHookTag) {
		this.tag = tag;
		this.next = null;
		this.payload = null;
	}
}

const hookTagCounter = new Counter();
export enum NanoHookTag {
    LayoutEffect = hookTagCounter.next(),
    Context = hookTagCounter.next(),
    Style = hookTagCounter.next(),
    Reducer = hookTagCounter.next(),
    Ref = hookTagCounter.next(),
    Callback = hookTagCounter.next(),
    Memo = hookTagCounter.next(),
}
