import { FlagGenerator, isFlag } from '@nano-ui/util';
import { NanoEffectHookPayload, NanoHook, NanoHookTag } from './hook';
import { isFunction, isValue } from '@nano-ui/type';
import { NanoFiber } from './fiber';

const effectTag = new FlagGenerator();
export enum NanoEffectTag {
  None = effectTag.next(),
  Placement = effectTag.next(),
  Update = effectTag.next(),
  Effect = effectTag.next(),
  Style = effectTag.next(),
  Deletion = effectTag.next(),
  ContentReset = effectTag.next(),
  Ref = effectTag.next(),
}

const effectFlag = new FlagGenerator();
export enum NanoEffectFlag {
  None = effectFlag.next(),
  Create = effectFlag.next(),
  Destroy = effectFlag.next(),
  Passive = effectFlag.next(),
}

export let passiveEffects: NanoEffectHookPayload[] = [];
let passiveEffectHandle: number | null = null;

export function runEffects(fiber: NanoFiber): void {
    for (let hook = fiber.memoizedState as NanoHook | null; hook !== null; hook = hook.next) {
        const effect = hook.payload as NanoEffectHookPayload;
        const passive = isFlag(effect.flags, NanoEffectFlag.Passive);
        if (!passive) {
            if (isFlag(effect.flags, NanoEffectFlag.Create)) {
                createEffect(effect);
            } else if (isFlag(effect.flags, NanoEffectFlag.Destroy)) {
                destroyEffect(effect);
            }
        }
    }
}

export function cleanupEffects(fiber: NanoFiber): void {
    for (let hook = fiber.memoizedState as NanoHook | null; hook !== null; hook = hook.next) {
        if (hook.tag === NanoHookTag.Effect) {
            const effect = hook.payload as NanoEffectHookPayload;
            const passive = isFlag(effect.flags, NanoEffectFlag.Passive);
            if (passive) {
                effect.flags |= NanoEffectFlag.Destroy;
                passiveEffects.push(effect);
            } else {
                destroyEffect(effect);
            }
        }
    }
}

export function pushPassiveEffect(effect: NanoEffectHookPayload): void {
    passiveEffects.push(effect);
}

export function schedulePassiveEffects(): void {
    if (passiveEffects.length === 0) {
        return;
    }

    passiveEffectHandle = window.setTimeout((): void => {
        passiveEffectHandle = null;
        runPassiveEffects();
    }, 0);
}

export function runPassiveEffects(): void {
    if (passiveEffectHandle !== null) {
        clearTimeout(passiveEffectHandle);
        passiveEffectHandle = null;
    }

    const effects = passiveEffects;
    passiveEffects = [];

    for (const effect of effects) {
        if (isFlag(effect.flags, NanoEffectFlag.Create)) {
            createEffect(effect);
        } else if (isFlag(effect.flags, NanoEffectFlag.Destroy)) {
            destroyEffect(effect);
        }
    }
}

function createEffect(effect: NanoEffectHookPayload): void {
    effect.flags &= ~NanoEffectFlag.Create;
    const destroy = effect.destroy;
    effect.destroy = destroy;
    if (isValue(destroy) && !isFunction(destroy)) {
        throw new Error('The return value of useEffect and useLayoutEffect must be a function or undefined');
    }
}

function destroyEffect(effect: NanoEffectHookPayload): void {
    effect.flags &= ~NanoEffectFlag.Destroy;
    effect.destroy?.();
}