export const isFlag = (value: number, flag: number): boolean =>
  (value & flag) === flag;
const maxFlagValue: number = 1 << 30;

export class FlagGenerator {
  public value: number;

  constructor() {
    this.value = 1;
  }

  next() {
    const value = this.value;
    if (value > maxFlagValue) {
      throw new Error('Flag generator overflow');
    }
    this.value *= 2;
    return value;
  }
}
