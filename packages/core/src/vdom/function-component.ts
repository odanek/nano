import { NanoFiber } from './fiber';

export function mountLifecycleEffects(
  current: NanoFiber,
  finishedWork: NanoFiber,
) {
  console.log(current, finishedWork);
}

export function unmountLifecycleEffects(
  current: NanoFiber,
  finishedWork: NanoFiber | null,
) {
  console.log(current, finishedWork);
}
