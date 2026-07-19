export function isFlag(value: number, flag: number): boolean {
  return (value & flag) === flag;
}
