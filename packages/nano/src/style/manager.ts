import type { Style, StyleBundle } from '../api/style';

type RefCountMap<T> = Map<T, number>;

const activeStyles: RefCountMap<Style> = new Map();
const activeBundles: RefCountMap<StyleBundle> = new Map();
const cleanupTimeout: number = 2000;
let totalRuleCount = 0;
let cleanupHandle: number | null = null;

export function connectBundle(bundle: StyleBundle): void {
  if (retain(activeBundles, bundle)) {
    const styleSheet = getStyleSheet();
    for (const style of Object.values(bundle)) {
      connectStyle(styleSheet, style);
    }
  }
}

export function disconnectBundle(bundle: StyleBundle): void {
  if (release(activeBundles, bundle)) {
    scheduleCleanup();
  }
}

function scheduleCleanup(): void {
  if (cleanupHandle === null) {
    cleanupHandle = window.setTimeout(() => {
      cleanupHandle = null;
      cleanup();
    }, cleanupTimeout);
  }
}

function cleanup(): void {
  if (cleanupHandle !== null) {
    clearTimeout(cleanupHandle);
    cleanupHandle = null;
  }

  cleanupBundles();
  cleanupStyles();
}

function cleanupBundles(): void {
  const cleanedBundles = new Set<StyleBundle>();
  for (const [bundle, referenceCount] of activeBundles.entries()) {
    if (referenceCount === 0 && !cleanedBundles.has(bundle)) {
      cleanupBundle(bundle, cleanedBundles);
    }
  }

  for (const bundle of cleanedBundles) {
    activeBundles.delete(bundle);
  }
}

function cleanupBundle(
  bundle: StyleBundle,
  cleanedBundles: Set<StyleBundle>,
): void {
  cleanedBundles.add(bundle);
  for (const style of Object.values(bundle)) {
    disconnectStyle(style, false);
  }
}

function cleanupStyles(): void {
  const styleSheet = getStyleSheet();
  const sheet = styleSheet.sheet;
  let index = 0;
  for (const [style, referenceCount] of activeStyles.entries()) {
    if (referenceCount === 0) {
      activeStyles.delete(style);
      totalRuleCount -= 1;
      // @ts-expect-error The sheet will always be non-null
      sheet.deleteRule(index);
    } else {
      index += 1;
    }
  }

  if (activeStyles.size === 0) {
    document.head.removeChild(styleSheet);
  }
}

function retain<T>(map: RefCountMap<T>, object: T): boolean {
  const referenceCount = map.get(object);
  if (referenceCount !== undefined) {
    map.set(object, referenceCount + 1);
    return false;
  } else {
    map.set(object, 1);
    return true;
  }
}

function release<T>(map: RefCountMap<T>, object: T): boolean {
  let referenceCount = map.get(object);
  if (referenceCount === undefined || referenceCount < 1) {
    throw new Error('Releasing a style or bundle that has not been retained');
  }
  referenceCount--;
  map.set(object, referenceCount);
  return referenceCount === 0;
}

function connectStyle(styleSheet: HTMLStyleElement, style: Style): void {
  if (retain(activeStyles, style)) {
    if (activeStyles.size === 1) {
      document.head.appendChild(styleSheet);
    }
    // @ts-expect-error The sheet will always be non-null
    styleSheet.sheet.insertRule(style.rule, totalRuleCount);
    totalRuleCount++;
  }
}

function disconnectStyle(style: Style, cleanup: boolean): void {
  if (release(activeStyles, style) && cleanup !== false) {
    scheduleCleanup();
  }
}

let styleSheetInstance: HTMLStyleElement | null = null;
function getStyleSheet(): HTMLStyleElement {
  if (styleSheetInstance === null) {
    styleSheetInstance = document.createElement('style');
    styleSheetInstance.classList.add('nano-styles');
  }
  return styleSheetInstance;
}
