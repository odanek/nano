import { type EffectHookPayload, Hook, HookTag } from './hook';
import { Fiber } from '../reconciler/fiber';
import { isFunction, isValue } from '../shared/predicate';
import { type ValueOf } from '../shared/type';
import { isFlag } from '../shared/flags';

export const EffectTag = {
  None: 0x00,
  Placement: 0x01,
  Update: 0x02,
  Effect: 0x04,
  Style: 0x08,
  Deletion: 0x10,
  ContentReset: 0x20,
  Ref: 0x40,
};
export type EffectTagValue = ValueOf<typeof EffectTag>;

export const EffectFlag = {
  None: 0x00,
  Create: 0x01,
  Destroy: 0x02,
  Passive: 0x04,
};

export let passiveEffects: EffectHookPayload[] = [];
let passiveEffectHandle: number | null = null;

export function runEffects(fiber: Fiber): void {
  for (
    let hook = fiber.memoizedState as Hook | null;
    hook !== null;
    hook = hook.next
  ) {
    if (hook.tag === HookTag.Effect) {
      const effect = hook.payload as EffectHookPayload;
      const passive = isFlag(effect.flags, EffectFlag.Passive);
      if (!passive) {
        if (isFlag(effect.flags, EffectFlag.Create)) {
          createEffect(effect);
        } else if (isFlag(effect.flags, EffectFlag.Destroy)) {
          destroyEffect(effect);
        }
      }
    }
  }
}

export function cleanupEffects(fiber: Fiber): void {
  for (
    let hook = fiber.memoizedState as Hook | null;
    hook !== null;
    hook = hook.next
  ) {
    if (hook.tag === HookTag.Effect) {
      const effect = hook.payload as EffectHookPayload;
      const passive = isFlag(effect.flags, EffectFlag.Passive);
      if (passive) {
        effect.flags |= EffectFlag.Destroy;
        passiveEffects.push(effect);
      } else {
        destroyEffect(effect);
      }
    }
  }
}

export function pushPassiveEffect(effect: EffectHookPayload): void {
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
    if (isFlag(effect.flags, EffectFlag.Create)) {
      createEffect(effect);
    } else if (isFlag(effect.flags, EffectFlag.Destroy)) {
      destroyEffect(effect);
    }
  }
}

function createEffect(effect: EffectHookPayload): void {
  effect.flags &= ~EffectFlag.Create;
  const destroy = effect.create();
  effect.destroy = destroy;
  if (isValue(destroy) && !isFunction(destroy)) {
    throw new Error(
      'The return value of useEffect and useLayoutEffect must be a function or undefined',
    );
  }
}

function destroyEffect(effect: EffectHookPayload): void {
  effect.flags &= ~EffectFlag.Destroy;
  effect.destroy?.();
}
