export function isPowerOf2(value: number): boolean {
  return value !== 0 && !(value & (value - 1));
}

export function randomInteger(min: number, max: number): number {
  const count = max - min;
  const result = min + Math.floor(Math.random() * count);
  return result;
}

export function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}
