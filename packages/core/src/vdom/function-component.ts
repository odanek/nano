import { NanoFiber } from './fiber';

export function mountLifecycleEffects(current: NanoFiber, finishedWork: NanoFiber) {
    console.log(current, finishedWork);
}