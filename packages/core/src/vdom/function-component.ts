import { NanoFiber } from './fiber';

export function mountLifecycleEffects(
  current: NanoFiber | null,
  finishedWork: NanoFiber,
) {
  console.log(current, finishedWork);
}

export function unmountLifecycleEffects(
  current: NanoFiber | null,
  finishedWork: NanoFiber | null,
) {
  console.log(current, finishedWork);
}
