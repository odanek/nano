import { type NanoEffectHookPayload, NanoHook, NanoHookTag } from './hook';
import { NanoFiber } from './fiber';
import { isFlag, isFunction, isValue, type ValueOf } from '../util';

export const NanoEffectTag = {
  None: 0x00,
  Placement: 0x01,
  Update: 0x02,
  Effect: 0x04,
  Style: 0x08,
  Deletion: 0x10,
  ContentReset: 0x20,
  Ref: 0x40,
};
export type NanoEffectTagValue = ValueOf<typeof NanoEffectTag>;

export const NanoEffectFlag = {
  None: 0x00,
  Create: 0x01,
  Destroy: 0x02,
  Passive: 0x04,
};

export let passiveEffects: NanoEffectHookPayload[] = [];
let passiveEffectHandle: number | null = null;

export function runEffects(fiber: NanoFiber): void {
  for (
    let hook = fiber.memoizedState as NanoHook | null;
    hook !== null;
    hook = hook.next
  ) {
    if (hook.tag === NanoHookTag.Effect) {
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
}

export function cleanupEffects(fiber: NanoFiber): void {
  for (
    let hook = fiber.memoizedState as NanoHook | null;
    hook !== null;
    hook = hook.next
  ) {
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
  const destroy = effect.create();
  effect.destroy = destroy;
  if (isValue(destroy) && !isFunction(destroy)) {
    throw new Error(
      'The return value of useEffect and useLayoutEffect must be a function or undefined',
    );
  }
}

function destroyEffect(effect: NanoEffectHookPayload): void {
  effect.flags &= ~NanoEffectFlag.Destroy;
  effect.destroy?.();
}
