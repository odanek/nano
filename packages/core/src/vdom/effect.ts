import { FlagGenerator } from '@nano-ui/util';

const effectTagCounter = new FlagGenerator();
export enum NanoEffectTag {
  None = effectTagCounter.next(),
  Placement = effectTagCounter.next(),
  Update = effectTagCounter.next(),
  Lifecycle = effectTagCounter.next(),
  Deletion = effectTagCounter.next(),
  ContentReset = effectTagCounter.next(),
  Ref = effectTagCounter.next(),
}
